package com.gymbasics.gymbasics.controllers;

import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.services.RoutineService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
