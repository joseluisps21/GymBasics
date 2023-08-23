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
@Table(name = "exercises")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String level;

    private String focus;

    private String picture;

    @ManyToMany
    @JoinTable(
            name = "exercise_muscle",
            joinColumns = @JoinColumn(name = "id_exercise"),
            inverseJoinColumns = @JoinColumn(name = "id_muscle")
    )
    private List<Muscle> muscles;

    //Esta informacion no es de interes para el usuario objetivo
    @ManyToMany(mappedBy = "exercises")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Routine> routines;

    @OneToMany(mappedBy = "exercise")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<Activity> activities;

    // Constructor, getters, setters y otros métodos
}

