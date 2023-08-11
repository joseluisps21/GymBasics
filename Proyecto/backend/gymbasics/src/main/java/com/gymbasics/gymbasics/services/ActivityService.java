package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.entities.Activity;
import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.repository.ActivityRepository;
import com.gymbasics.gymbasics.repository.RoutineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepository repository;

    public List<Activity> getAll(){
        return (List<Activity>) repository.findAll();
    }


    public Activity getById(Long id) {
        return (Activity) repository.findById(id).get();
    }

    public void remove(Long id){
        repository.deleteById(id);
    }

    public void save(Activity activity){
        repository.save(activity);
    }

}
