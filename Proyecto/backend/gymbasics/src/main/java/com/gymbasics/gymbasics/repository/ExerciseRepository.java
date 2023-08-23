package com.gymbasics.gymbasics.repository;

import com.gymbasics.gymbasics.entities.Exercise;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends CrudRepository<Exercise, Long> {



        @Query("SELECT e FROM Exercise e WHERE e.level = :userLevel AND e.focus = :userFocus")
        List<Exercise> findMatchingExercises(@Param("userLevel") String userLevel, @Param("userFocus") String userFocus);

        @Query("SELECT e FROM Exercise e WHERE e.level = :userLevel AND (e.focus = 'musclemass' OR e.focus = 'loseweight')")
        List<Exercise> findMatchingExercisesMixed(@Param("userLevel") String userLevel);


}
