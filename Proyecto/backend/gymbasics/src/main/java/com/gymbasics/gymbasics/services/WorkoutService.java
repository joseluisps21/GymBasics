package com.gymbasics.gymbasics.services;

import com.gymbasics.gymbasics.entities.*;
import com.gymbasics.gymbasics.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class WorkoutService {
    @Autowired
    private WorkoutRepository repository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

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

    @Transactional
    public Workout createWorkoutWithActivitiesAndResults(Workout workout, List<Activity> activities) {
        Workout savedWorkout = repository.save(workout);

        for (Activity activity : activities) {
            activity.setWorkout(savedWorkout);
            Activity savedActivity = activityRepository.save(activity);

            for (Result result : savedActivity.getResults()) {
                result.setActivity(savedActivity);
                resultRepository.save(result);
            }
        }

        return savedWorkout;
    }

    public List<Workout> getWorkoutsForUsername(String username) {
        User user = userRepository.findUserByUsername(username);

        if (user == null) {
            // Manejar caso de usuario no encontrado
            return Collections.emptyList();
        }

        return workoutRepository.findByRoutineUser(user);
    }

    public List<Workout> getWorkoutsWithSpecificExercise(String username, Long exerciseId) {
        User user = userRepository.findUserByUsername(username);
        Exercise exercise = exerciseRepository.findById(exerciseId).orElse(null);

        if (user != null && exercise != null) {
            List<Workout> workoutsWithExercise = new ArrayList<>();

            for (Routine routine : user.getRoutines()) {
                for (Workout workout : routine.getWorkouts()) {
                    List<Activity> activitiesWithExercise = new ArrayList<>();
                    for (Activity activity : workout.getActivities()) {
                        if (activity.getExercise().equals(exercise)) {
                            activity.getResults().size(); // Load results
                            activitiesWithExercise.add(activity);
                        }
                    }
                    if (!activitiesWithExercise.isEmpty()) {
                        workout.setActivities(activitiesWithExercise);
                        workoutsWithExercise.add(workout);
                    }
                }
            }

            return workoutsWithExercise;
        }

        return Collections.emptyList();
    }

    public int getWorkoutsCountThisMonth(String username) {
        User user = userRepository.findUserByUsername(username);

        if (user != null) {
            LocalDate currentDate = LocalDate.now();
            int workoutsCount = 0;

            for (Routine routine : user.getRoutines()) {
                for (Workout workout : routine.getWorkouts()) {
                    LocalDate workoutDate = workout.getDate();
                    if (workoutDate != null && workoutDate.getMonth() == currentDate.getMonth()) {
                        workoutsCount++;
                    }
                }
            }

            return workoutsCount;
        }

        return 0;
    }

}
