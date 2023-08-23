package com.gymbasics.gymbasics.DTOs;

import com.gymbasics.gymbasics.entities.Activity;
import com.gymbasics.gymbasics.entities.Workout;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WorkoutDTO {

    private Workout workout;
    private List<Activity> activities;
}
