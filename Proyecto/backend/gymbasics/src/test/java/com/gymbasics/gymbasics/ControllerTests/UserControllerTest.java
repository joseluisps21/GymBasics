package com.gymbasics.gymbasics.ControllerTests;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gymbasics.gymbasics.DTOs.EditFocusRequest;
import com.gymbasics.gymbasics.DTOs.EditLevelRequest;
import com.gymbasics.gymbasics.DTOs.UserUpdatedDTO;
import com.gymbasics.gymbasics.controllers.UserController;
import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.entities.User;
import com.gymbasics.gymbasics.entities.UserCredentials;
import com.gymbasics.gymbasics.services.CustomUserDetailsService;
import com.gymbasics.gymbasics.services.IUserService;
import com.gymbasics.gymbasics.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    private String asJsonString(Object object) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @MockBean
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService service;

    private MockMvc mockMvc;

    @Mock
    private IUserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void testGetByUsername() throws Exception {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setName("Test User");
        user.setPassword("password123");
        user.setEmail("testuser@example.com");
        user.setLevel("Intermediate");
        user.setFocus("Strength");
        user.setWeight("70");

        when(userService.getUserByUsername("testuser")).thenReturn(Optional.of(user));

        mockMvc.perform(get("/api/users/{username}", "testuser"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Test User"))
                .andExpect(jsonPath("$.password").value("password123"))
                .andExpect(jsonPath("$.email").value("testuser@example.com"))
                .andExpect(jsonPath("$.level").value("Intermediate"))
                .andExpect(jsonPath("$.focus").value("Strength"))
                .andExpect(jsonPath("$.weight").value("70"));

        verify(userService, times(1)).getUserByUsername("testuser");
    }

    @Test
    public void testRemoveUser() throws Exception {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");

        when(userService.getById(1L)).thenReturn(user);
        doNothing().when(userService).remove(user.getId());

        mockMvc.perform(delete("/api/users/{id}", "1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(userService, times(1)).remove(user.getId());
    }

    @Test
    public void testRegisterUserSuccess() {
        // Datos de usuario ficticio
        User newUser = new User();
        newUser.setUsername("nuevoUsuario");
        newUser.setPassword("contrasena123");

        // Simula que el nombre de usuario no existe
        when(userService.usernameExists(newUser.getUsername())).thenReturn(false);

        // Simula el guardado exitoso del usuario
        doNothing().when(userService).save(newUser);

        // Llama al método registerUser
        ResponseEntity<String> response = userController.registerUser(newUser);

        // Verifica que se devuelva una respuesta HTTP 200 OK
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Verifica el mensaje de respuesta
        assertEquals("Usuario creado de forma exitosa", response.getBody());

        // Verifica que el servicio haya sido llamado con el usuario correcto
        verify(userService, times(1)).save(newUser);
    }

    @Test
    public void testRegisterUserFailureShortPassword() {
        // Datos de usuario ficticio con una contraseña corta
        User newUser = new User();
        newUser.setUsername("nuevoUsuario");
        newUser.setPassword("abc"); // Contraseña corta

        ResponseEntity<String> response = userController.registerUser(newUser);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());


        assertEquals("La contraseña debe tener al menos 4 caracteres", response.getBody());

        verify(userService, never()).save(newUser);
    }

    @Test
    public void testRegisterUserUsernameExists() throws Exception {
        User existingUser = new User();
        existingUser.setUsername("usuarioExistente");


        when(userService.usernameExists("usuarioExistente")).thenReturn(true);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"usuarioExistente\",\"password\":\"contrasena123\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(MockMvcResultMatchers.content().string("El nombre de usuario ya existe, escoge otro"));
    }

    @Test
    public void testGetUserRoutinesByUsername() throws Exception {
        List<Routine> exampleRoutines = new ArrayList<>();
        Routine routine1 = new Routine();
        routine1.setId(1L);
        routine1.setName("Rutina 1");
        exampleRoutines.add(routine1);

        Routine routine2 = new Routine();
        routine2.setId(2L);
        routine2.setName("Rutina 2");
        exampleRoutines.add(routine2);

        when(userService.getUserRoutinesByUsername("ejemploUsuario")).thenReturn(exampleRoutines);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/ejemploUsuario/routines")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Rutina 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].id").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].name").value("Rutina 2"));
    }

    @Test
    public void testUpdateUser() throws Exception {
        String username = "usuarioEjemplo";
        UserUpdatedDTO userUpdateDTO = new UserUpdatedDTO();
        userUpdateDTO.setName("NuevoNombre");
        userUpdateDTO.setEmail("nuevoemail@example.com");
        userUpdateDTO.setLevel("NuevoNivel");
        userUpdateDTO.setFocus("NuevoEnfoque");
        userUpdateDTO.setWeight("NuevaPeso");

        ObjectMapper objectMapper = new ObjectMapper();
        String requestJson = objectMapper.writeValueAsString(userUpdateDTO);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.patch("/api/edit/" + username)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk())
                .andReturn();

        String responseJson = result.getResponse().getContentAsString();
        UserUpdatedDTO responseDTO = objectMapper.readValue(responseJson, UserUpdatedDTO.class);

        assertEquals(userUpdateDTO.getName(), responseDTO.getName());
        assertEquals(userUpdateDTO.getEmail(), responseDTO.getEmail());
        assertEquals(userUpdateDTO.getLevel(), responseDTO.getLevel());
        assertEquals(userUpdateDTO.getFocus(), responseDTO.getFocus());
        assertEquals(userUpdateDTO.getWeight(), responseDTO.getWeight());
    }

}
