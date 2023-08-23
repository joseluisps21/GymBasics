package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.entities.Exercise;
import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.repository.ExerciseRepository;
import com.gymbasics.gymbasics.repository.RoutineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {
    @Autowired
    private ExerciseRepository repository;

    public List<Exercise> getAll(){
        return (List<Exercise>) repository.findAll();
    }


    public Exercise getById(Long id) {
        return (Exercise) repository.findById(id).get();
    }

    public void remove(Long id){
        repository.deleteById(id);
    }

    public void save(Exercise exercise){
        repository.save(exercise);
    }

}
