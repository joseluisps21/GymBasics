package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.entities.Result;
import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.repository.ResultRepository;
import com.gymbasics.gymbasics.repository.RoutineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {
    @Autowired
    private ResultRepository repository;

    public List<Result> getAll(){
        return (List<Result>) repository.findAll();
    }


    public Result getById(Long id) {
        return (Result) repository.findById(id).get();
    }

    public void remove(Long id){
        repository.deleteById(id);
    }

    public void save(Result result){
        repository.save(result);
    }

}
