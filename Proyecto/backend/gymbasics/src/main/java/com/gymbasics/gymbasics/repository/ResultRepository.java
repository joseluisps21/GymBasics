package com.gymbasics.gymbasics.repository;

import com.gymbasics.gymbasics.entities.Result;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends CrudRepository<Result, Long> {

}
