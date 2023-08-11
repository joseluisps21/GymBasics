package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.entities.Workout;
import com.gymbasics.gymbasics.repository.RoutineRepository;
import com.gymbasics.gymbasics.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {
    @Autowired
    private WorkoutRepository repository;

    public List<Workout> getAll(){
        return (List<Workout>) repository.findAll();
    }


    public Workout getById(Long id) {
        return (Workout) repository.findById(id).get();
    }

    public void remove(Long id){
        repository.deleteById(id);
    }

    public void save(Workout workout){
        repository.save(workout);
    }

}
