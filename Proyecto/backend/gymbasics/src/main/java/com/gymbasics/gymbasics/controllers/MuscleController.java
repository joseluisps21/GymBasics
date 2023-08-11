package com.gymbasics.gymbasics.controllers;

import com.gymbasics.gymbasics.entities.Muscle;
import com.gymbasics.gymbasics.services.MuscleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MuscleController {

    @Autowired
    private MuscleService service;


    @GetMapping("/api/muscles")
    public List<Muscle> getAll(){
        return service.getAll();
    }

    @GetMapping("/api/muscles/{id}")
    public Muscle getById(@PathVariable String id){
        return service.getById(Long.parseLong(id));
    }
    @DeleteMapping("/api/muscles/{id}")
    public void remove(@PathVariable String id){
        service.remove(Long.parseLong(id));
    }

    @PostMapping("api/muscles")
    public void save(@RequestBody Muscle muscle){
        service.save(muscle);
    }
}
