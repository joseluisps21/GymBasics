package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.entities.Exercise;
import com.gymbasics.gymbasics.entities.Muscle;
import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.entities.User;
import com.gymbasics.gymbasics.repository.ExerciseRepository;
import com.gymbasics.gymbasics.repository.MuscleRepository;
import com.gymbasics.gymbasics.repository.RoutineRepository;
import com.gymbasics.gymbasics.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class ExerciseService {
    @Autowired
    private ExerciseRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MuscleRepository muscleRepository;

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

    public List<Exercise> getMatchingExercisesForUsername(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String userFocus = user.getFocus();

            if ("mixed".equalsIgnoreCase(userFocus)) {
                return repository.findMatchingExercisesMixed(user.getLevel());
            } else {
                return repository.findMatchingExercises(user.getLevel(), userFocus);
            }
        } else {
            return Collections.emptyList();
        }
    }

    @Transactional
    public Exercise createExerciseWithMuscles(String exerciseName, String exerciseLevel, String exerciseFocus, String exercisePicture, List<Long> muscleIds) {
        Exercise exercise = new Exercise();
        exercise.setName(exerciseName);
        exercise.setLevel(exerciseLevel);
        exercise.setFocus(exerciseFocus);
        exercise.setPicture(exercisePicture);

        List<Muscle> muscles = (List<Muscle>) muscleRepository.findAllById(muscleIds);
        exercise.setMuscles(muscles);

        return repository.save(exercise);
    }

    public List<Exercise> findTop3FavoriteExercisesByUsername(String username) {
        Pageable pageable = PageRequest.of(0, 3);
        return repository.findTop3FavoriteExercisesByUsername(username, pageable);
    }

}
