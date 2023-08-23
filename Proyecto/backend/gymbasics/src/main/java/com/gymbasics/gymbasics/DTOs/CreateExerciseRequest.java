package com.gymbasics.gymbasics.DTOs;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateExerciseRequest {

    private String exerciseName;
    private String exerciseLevel;
    private String exerciseFocus;
    private String exercisePicture;
    private List<Long> muscleIds;

}
