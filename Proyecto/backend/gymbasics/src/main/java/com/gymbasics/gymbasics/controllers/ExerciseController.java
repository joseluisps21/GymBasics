package com.gymbasics.gymbasics.controllers;

import com.gymbasics.gymbasics.entities.Exercise;
import com.gymbasics.gymbasics.services.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
