package com.gymbasics.gymbasics.repository;

import com.gymbasics.gymbasics.entities.User;
import com.gymbasics.gymbasics.entities.Workout;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutRepository extends CrudRepository<Workout, Long> {
        List<Workout> findByRoutineUser(User user);
    }
