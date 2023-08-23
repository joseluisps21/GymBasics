package com.gymbasics.gymbasics.DTOs;

import com.gymbasics.gymbasics.entities.Exercise;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RoutineDTO {

    private String username;
    private String routineName;
    private List<Exercise> exercises;
}
