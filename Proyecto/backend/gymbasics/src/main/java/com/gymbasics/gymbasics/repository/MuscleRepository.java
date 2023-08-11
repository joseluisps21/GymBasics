package com.gymbasics.gymbasics.repository;

import com.gymbasics.gymbasics.entities.Muscle;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MuscleRepository extends CrudRepository<Muscle, Long> {

}
