package com.gymbasics.gymbasics.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.engine.spi.ActionQueue;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "workouts")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private String time;

    @ManyToOne
    @JoinColumn(name = "id_routine")
    @JsonIgnore
    private Routine routine;

    @OneToMany(mappedBy = "workout")
    private List<Activity> activities;
}
