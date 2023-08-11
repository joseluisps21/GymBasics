package com.gymbasics.gymbasics.repository;


import com.gymbasics.gymbasics.entities.Routine;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoutineRepository extends CrudRepository<Routine, Long> {

}
