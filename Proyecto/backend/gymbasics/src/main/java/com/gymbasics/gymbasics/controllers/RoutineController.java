package com.gymbasics.gymbasics.controllers;

import com.gymbasics.gymbasics.DTOs.EditRoutineRequest;
import com.gymbasics.gymbasics.DTOs.RoutineDTO;
import com.gymbasics.gymbasics.entities.Exercise;
import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.services.RoutineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RoutineController {

    @Autowired
    private RoutineService service;


    @GetMapping("/api/routines")
    public List<Routine> getAll(){
        return service.getAll();
    }

    @GetMapping("/api/routines/{id}")
    public Routine getById(@PathVariable String id){
        return service.getById(Long.parseLong(id));
    }
    @DeleteMapping("/api/routines/{id}")
    public void remove(@PathVariable String id){
        service.remove(Long.parseLong(id));
    }

    @PostMapping("api/routines")
    public void save(@RequestBody Routine routine){
        service.save(routine);
    }

    @GetMapping("api/{routineId}/exercises")
    public ResponseEntity<List<Exercise>> getExercisesByRoutineId(@PathVariable Long routineId) {
        List<Exercise> exercises = service.getExercisesByRoutineId(routineId);

        if (exercises.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(exercises);
    }

    @PostMapping("/api/createroutine")
    public ResponseEntity<Routine> createRoutine(@RequestBody RoutineDTO request) {
        Routine createdRoutine = service.createRoutineWithExercises(request);
        return ResponseEntity.ok(createdRoutine);
    }

    @PatchMapping("/api/editroutine/{routineId}")
    public Routine editRoutineWithExercises(@PathVariable Long routineId, @RequestBody EditRoutineRequest request) {
        return service.editRoutineWithExercises(
                routineId,
                request.getRoutineName(),
                request.getExercises()
        );
    }

}
