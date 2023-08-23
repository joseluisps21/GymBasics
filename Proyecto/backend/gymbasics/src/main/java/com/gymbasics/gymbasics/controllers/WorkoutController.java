package com.gymbasics.gymbasics.controllers;

import com.gymbasics.gymbasics.DTOs.WorkoutDTO;
import com.gymbasics.gymbasics.entities.Activity;
import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.entities.Workout;
import com.gymbasics.gymbasics.services.RoutineService;
import com.gymbasics.gymbasics.services.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WorkoutController {

    @Autowired
    private WorkoutService service;


    @GetMapping("/api/workouts")
    public List<Workout> getAll(){
        return service.getAll();
    }

    @GetMapping("/api/workouts/{id}")
    public Workout getById(@PathVariable String id){
        return service.getById(Long.parseLong(id));
    }
    @DeleteMapping("/api/workouts/{id}")
    public void remove(@PathVariable String id){
        service.remove(Long.parseLong(id));
    }

    @PostMapping("api/workouts")
    public void save(@RequestBody Workout workout){
        service.save(workout);
    }

    @PostMapping("/api/createworkout")
    public ResponseEntity<Workout> createWorkoutWithActivitiesAndResults(
            @RequestBody WorkoutDTO request) {
        Workout workout = request.getWorkout();
        List<Activity> activities = request.getActivities();

        Workout createdWorkout = service.createWorkoutWithActivitiesAndResults(workout, activities);

        return ResponseEntity.ok(createdWorkout);
    }

    @GetMapping("api/{username}/workouts")
    public ResponseEntity<List<Workout>> getWorkoutsForUser(@PathVariable String username) {
        List<Workout> userWorkouts = service.getWorkoutsForUsername(username);

        if (userWorkouts.isEmpty()) {
            // Manejar caso de workouts no encontrados
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(userWorkouts);
    }

    @GetMapping("api/getspecificworkout/{username}/{exerciseId}")
    public List<Workout> getWorkoutsWithSpecificExercise(
            @PathVariable String username,
            @PathVariable Long exerciseId) {
        return service.getWorkoutsWithSpecificExercise(username, exerciseId);
    }

    @GetMapping("api/workoutscount/{username}")
    public int getWorkoutsCountThisMonth(@PathVariable String username) {
        return service.getWorkoutsCountThisMonth(username);
    }
}
