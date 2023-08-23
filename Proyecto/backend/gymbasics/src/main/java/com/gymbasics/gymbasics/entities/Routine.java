package com.gymbasics.gymbasics.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "routine_exercise",
            joinColumns = @JoinColumn(name = "id_routine"),
            inverseJoinColumns = @JoinColumn(name = "id_exercise")
    )
    private List<Exercise> exercises;

    @OneToMany(mappedBy = "routine")
    private List<Workout> workouts;
}
