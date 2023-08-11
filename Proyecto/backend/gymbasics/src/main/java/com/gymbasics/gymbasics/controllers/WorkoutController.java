package com.gymbasics.gymbasics.controllers;

import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.entities.Workout;
import com.gymbasics.gymbasics.services.RoutineService;
import com.gymbasics.gymbasics.services.WorkoutService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
