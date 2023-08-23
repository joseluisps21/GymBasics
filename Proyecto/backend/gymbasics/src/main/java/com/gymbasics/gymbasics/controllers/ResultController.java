package com.gymbasics.gymbasics.controllers;

import com.gymbasics.gymbasics.entities.Result;
import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.services.ResultService;
import com.gymbasics.gymbasics.services.RoutineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ResultController {

    @Autowired
    private ResultService service;


    @GetMapping("/api/results")
    public List<Result> getAll(){
        return service.getAll();
    }

    @GetMapping("/api/results/{id}")
    public Result getById(@PathVariable String id){
        return service.getById(Long.parseLong(id));
    }
    @DeleteMapping("/api/results/{id}")
    public void remove(@PathVariable String id){
        service.remove(Long.parseLong(id));
    }

    @PostMapping("api/results")
    public void save(@RequestBody Result result){
        service.save(result);
    }
}
