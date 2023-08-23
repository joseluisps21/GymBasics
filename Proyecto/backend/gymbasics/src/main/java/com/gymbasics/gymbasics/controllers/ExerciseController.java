package com.gymbasics.gymbasics.controllers;

import com.gymbasics.gymbasics.DTOs.CreateExerciseRequest;
import com.gymbasics.gymbasics.entities.Exercise;
import com.gymbasics.gymbasics.services.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ExerciseController {

    @Autowired
    private ExerciseService service;


    @GetMapping("/api/exercises")
    public List<Exercise> getAll(){
        return service.getAll();
    }

    @GetMapping("/api/exercises/{id}")
    public Exercise getById(@PathVariable String id){
        return service.getById(Long.parseLong(id));
    }
    @DeleteMapping("/api/exercises/{id}")
    public void remove(@PathVariable String id){
        service.remove(Long.parseLong(id));
    }

    @PostMapping("api/exercises")
    public void save(@RequestBody Exercise exercise){
        service.save(exercise);
    }

    @GetMapping("api/matching/{username}")
    public ResponseEntity<List<Exercise>> getMatchingExercisesForUser(@PathVariable String username) {
        List<Exercise> matchingExercises = service.getMatchingExercisesForUsername(username);

        if (matchingExercises.isEmpty()) {
            // Manejar caso de ejercicios no encontrados
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(matchingExercises);
    }

    @PostMapping("api/createexercise")
    public Exercise createExerciseWithMuscles(@RequestBody CreateExerciseRequest request) {
        return service.createExerciseWithMuscles(
                request.getExerciseName(),
                request.getExerciseLevel(),
                request.getExerciseFocus(),
                request.getExercisePicture(),
                request.getMuscleIds()
        );
    }
}
