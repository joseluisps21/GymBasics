package com.gymbasics.gymbasics.ControllerTests;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gymbasics.gymbasics.DTOs.WorkoutDTO;
import com.gymbasics.gymbasics.controllers.WorkoutController;
import com.gymbasics.gymbasics.entities.*;
import com.gymbasics.gymbasics.repository.ExerciseRepository;
import com.gymbasics.gymbasics.repository.RoutineRepository;
import com.gymbasics.gymbasics.repository.UserRepository;
import com.gymbasics.gymbasics.repository.WorkoutRepository;
import com.gymbasics.gymbasics.services.UserService;
import com.gymbasics.gymbasics.services.WorkoutService;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class WorkoutControllerTest {


    @InjectMocks
    private WorkoutController workoutController;

    @Mock
    private WorkoutService workoutService;

    @Mock
    private UserService userService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private MockMvc mockMvc;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ExerciseRepository exerciseRepository;

    @Mock
    private RoutineRepository routineRepository;

    @Mock
    private WorkoutRepository workoutRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(workoutController).build();
        userRepository = Mockito.mock(UserRepository.class);
        workoutController = new WorkoutController();
    }
    @Test
    public void testCreateWorkoutWithActivitiesAndResults() throws Exception {
        setup();

        Workout workout = new Workout();
        workout.setId(1L);

        List<Activity> activities = new ArrayList<>();
        Activity activity1 = new Activity();
        activity1.setId(1L);
        activity1.setNote("Ejercicio 1");
        activities.add(activity1);

        Activity activity2 = new Activity();
        activity2.setId(2L);
        activity2.setNote("Ejercicio 2");
        activities.add(activity2);

        WorkoutDTO request = new WorkoutDTO();
        request.setWorkout(workout);
        request.setActivities(activities);

        when(workoutService.createWorkoutWithActivitiesAndResults(workout, activities)).thenReturn(workout);

        String requestJson = objectMapper.writeValueAsString(request);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/createworkout")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1)); // Verifica el ID del entrenamiento creado
    }

    @Test
    public void testGetWorkoutsCountThisMonth() throws Exception {
        User user = new User();
        user.setUsername("testUser");
        user.setRoutines(new ArrayList<>());

        Routine routine = new Routine();
        routine.setUser(user);
        routine.setWorkouts(new ArrayList<>());

        Exercise exercise1 = new Exercise();
        exercise1.setName("Exercise 1");
        Exercise exercise2 = new Exercise();
        exercise2.setName("Exercise 2");

        List<Exercise> exercises = new ArrayList<>();
        exercises.add(exercise1);
        exercises.add(exercise2);
        routine.setExercises(exercises);

        Workout workout1 = new Workout();
        workout1.setDate(LocalDate.now());
        Workout workout2 = new Workout();
        workout2.setDate(LocalDate.now().minusDays(15)); // Un workout del mes pasado

        List<Workout> workouts = new ArrayList<>();
        workouts.add(workout1);
        workouts.add(workout2);
        routine.setWorkouts(workouts);

        user.getRoutines().add(routine);

        when(workoutService.getWorkoutsCountThisMonth("testUser")).thenReturn(1); // Supongamos que hay 1 workout este mes

        MvcResult result = mockMvc.perform(get("/api/workoutscount/{username}", "testUser")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        assertEquals(200, result.getResponse().getStatus());

        String responseContent = result.getResponse().getContentAsString();

        int workoutsCount = Integer.parseInt(responseContent);

        assertEquals(1, workoutsCount);
    }

    @Test
    public void testDeleteWorkoutById() throws Exception {
        Long workoutId = 1L;

        doNothing().when(workoutService).remove(workoutId);

        MvcResult result = mockMvc.perform(delete("/api/workout/{workoutId}", workoutId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        assertEquals(HttpStatus.OK.value(), result.getResponse().getStatus());

        verify(workoutService, times(1)).remove(workoutId);
    }








}

