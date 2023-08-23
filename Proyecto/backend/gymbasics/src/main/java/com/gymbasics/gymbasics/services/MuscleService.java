package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.entities.Muscle;
import com.gymbasics.gymbasics.repository.MuscleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MuscleService {
    @Autowired
    private MuscleRepository repository;

    public List<Muscle> getAll(){
        return (List<Muscle>) repository.findAll();
    }


    public Muscle getById(Long id) {
        return (Muscle) repository.findById(id).get();
    }

    public void remove(Long id){
        repository.deleteById(id);
    }

    public void save(Muscle muscle){
        repository.save(muscle);
    }

}
