package com.gymbasics.gymbasics.repository;

import com.gymbasics.gymbasics.entities.Activity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends CrudRepository<Activity, Long> {

}
