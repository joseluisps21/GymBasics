package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.repository.RoutineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoutineService {
    @Autowired
    private RoutineRepository repository;

    public List<Routine> getAll(){
        return (List<Routine>) repository.findAll();
    }


    public Routine getById(Long id) {
        return (Routine) repository.findById(id).get();
    }

    public void remove(Long id){
        repository.deleteById(id);
    }

    public void save(Routine routine){
        repository.save(routine);
    }

}
