package com.gymbasics.gymbasics.controllers;

import com.gymbasics.gymbasics.entities.Activity;
import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.services.ActivityService;
import com.gymbasics.gymbasics.services.RoutineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ActivityController {

    @Autowired
    private ActivityService service;


    @GetMapping("/api/activities")
    public List<Activity> getAll(){
        return service.getAll();
    }

    @GetMapping("/api/activities/{id}")
    public Activity getById(@PathVariable String id){
        return service.getById(Long.parseLong(id));
    }
    @DeleteMapping("/api/activities/{id}")
    public void remove(@PathVariable String id){
        service.remove(Long.parseLong(id));
    }

    @PostMapping("api/activities")
    public void save(@RequestBody Activity activity){
        service.save(activity);
    }
}
