package com.gymbasics.gymbasics.repository;


import com.gymbasics.gymbasics.entities.Exercise;
import com.gymbasics.gymbasics.entities.Routine;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoutineRepository extends CrudRepository<Routine, Long> {

    @Query("SELECT r.exercises FROM Routine r WHERE r.id = :routineId")
    List<Exercise> findExercisesByRoutineId(@Param("routineId") Long routineId);
}
