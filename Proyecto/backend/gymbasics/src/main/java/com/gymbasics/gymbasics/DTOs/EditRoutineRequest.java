package com.gymbasics.gymbasics.DTOs;

import com.gymbasics.gymbasics.entities.Exercise;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EditRoutineRequest {

    private String routineName;
    private List<Exercise> exercises;
}
