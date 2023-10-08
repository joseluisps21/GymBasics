package com.gymbasics.gymbasics.ControllerTests;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gymbasics.gymbasics.DTOs.EditRoutineRequest;
import com.gymbasics.gymbasics.DTOs.RoutineDTO;
import com.gymbasics.gymbasics.controllers.RoutineController;
import com.gymbasics.gymbasics.entities.Exercise;
import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.entities.User;
import com.gymbasics.gymbasics.services.RoutineService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringJUnitConfig
@WebMvcTest(RoutineController.class)
@AutoConfigureMockMvc
public class RoutineControllerTest {

    @InjectMocks
    private RoutineController routineController;

    @MockBean
    private RoutineService routineService;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(routineController).build();
    }


    @Test
    public void testGetExercisesByRoutineId() throws Exception {
        Long routineId = 1L;
        Routine mockRoutine = new Routine();
        mockRoutine.setId(routineId);

        Exercise exercise1 = new Exercise();
        exercise1.setId(1L);
        Exercise exercise2 = new Exercise();
        exercise2.setId(2L);

        List<Exercise> mockExercises = new ArrayList<>();
        mockExercises.add(exercise1);
        mockExercises.add(exercise2);

        when(routineService.getExercisesByRoutineId(routineId)).thenReturn(mockExercises);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/" + routineId + "/exercises")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        List<Exercise> responseExercises = objectMapper.readValue(result.getResponse().getContentAsString(),
                new TypeReference<List<Exercise>>() {});

        assertEquals(200, result.getResponse().getStatus());

        assertEquals(mockExercises.size(), responseExercises.size());
        assertEquals(mockExercises.get(0).getId(), responseExercises.get(0).getId());
        assertEquals(mockExercises.get(1).getId(), responseExercises.get(1).getId());
    }

    @Test
    public void testGetExercisesByNonExistentRoutineId() throws Exception {
        Long nonExistentRoutineId = 999L;

        when(routineService.getExercisesByRoutineId(nonExistentRoutineId)).thenReturn(new ArrayList<>());

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/" + nonExistentRoutineId + "/exercises")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is(HttpStatus.NOT_FOUND.value())) // Esperamos un 404 Not Found
                .andReturn();

        assertEquals(HttpStatus.NOT_FOUND.value(), result.getResponse().getStatus());
    }

    @Test
    public void testCreateRoutine() throws Exception {
        RoutineDTO request = new RoutineDTO();
        request.setUsername("testUser");
        request.setRoutineName("Test Routine");

        when(routineService.createRoutineWithExercises(request)).thenReturn(new Routine());

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/createroutine")
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(HttpStatus.OK.value(), result.getResponse().getStatus());
    }

    @Test
    public void testEditRoutineWithExercises() throws Exception {
        Long routineId = 1L;
        String updatedRoutineName = "Updated Routine";

        Exercise exercise1 = new Exercise();
        exercise1.setId(1L);
        Exercise exercise2 = new Exercise();
        exercise2.setId(2L);

        List<Exercise> updatedExercises = new ArrayList<>();
        updatedExercises.add(exercise1);
        updatedExercises.add(exercise2);

        Routine existingRoutine = new Routine();
        existingRoutine.setId(routineId);
        existingRoutine.setName("Original Routine");

        Routine updatedRoutine = new Routine();
        updatedRoutine.setId(routineId);
        updatedRoutine.setName(updatedRoutineName);
        updatedRoutine.setExercises(updatedExercises);

        EditRoutineRequest editRequest = new EditRoutineRequest();
        editRequest.setRoutineName(updatedRoutineName);
        editRequest.setExercises(updatedExercises);

        when(routineService.editRoutineWithExercises(routineId, updatedRoutineName, updatedExercises)).thenReturn(updatedRoutine);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.patch("/api/editroutine/" + routineId)
                        .content(objectMapper.writeValueAsString(editRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        Routine responseRoutine = objectMapper.readValue(result.getResponse().getContentAsString(), Routine.class);

        assertEquals(200, result.getResponse().getStatus());

        assertEquals(updatedRoutine.getId(), responseRoutine.getId());
        assertEquals(updatedRoutine.getName(), responseRoutine.getName());

    }




}





