package com.gymbasics.gymbasics.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "routines")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Routine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToMany
    @JoinTable(
            name = "routine_exercise",
            joinColumns = @JoinColumn(name = "id_routine"),
            inverseJoinColumns = @JoinColumn(name = "id_exercise")
    )
    private Set<Exercise> exercises;

    @OneToMany(mappedBy = "routine")
    private List<Workout> workouts;
}
