package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.DTOs.RoutineDTO;
import com.gymbasics.gymbasics.entities.Exercise;
import com.gymbasics.gymbasics.entities.Routine;
import com.gymbasics.gymbasics.entities.User;
import com.gymbasics.gymbasics.entities.Workout;
import com.gymbasics.gymbasics.repository.ExerciseRepository;
import com.gymbasics.gymbasics.repository.RoutineRepository;
import com.gymbasics.gymbasics.repository.UserRepository;
import com.gymbasics.gymbasics.repository.WorkoutRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoutineService {
    @Autowired
    private RoutineRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

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

    public List<Exercise> getExercisesByRoutineId(Long routineId) {
        return repository.findExercisesByRoutineId(routineId);
    }

    @Transactional
    public Routine createRoutineWithExercises(RoutineDTO request) {
        User user = userRepository.findUserByUsername(request.getUsername());
        if (user == null) {
            return null;
        }

        Routine routine = new Routine();
        routine.setName(request.getRoutineName());
        routine.setUser(user);
        routine.setExercises(request.getExercises());

        return repository.save(routine);
    }

    @Transactional
    public Routine editRoutineWithExercises(Long routineId, String routineName, List<Exercise> exercises) {
        Routine routine = repository.findById(routineId).orElse(null);
        if (routine != null) {
            routine.setName(routineName);
            routine.setExercises(exercises);
            return repository.save(routine);
        }
        return null;
    }

}
