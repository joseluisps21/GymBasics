package com.gymbasics.gymbasics.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Table(name = "muscles")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Muscle {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "muscles")
    @JsonIgnore
    private List<Exercise> exercises;


}
