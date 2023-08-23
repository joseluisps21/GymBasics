package com.gymbasics.gymbasics.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Table(name = "activities")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String note;

    @ManyToOne
    @JoinColumn(name = "id_exercise")
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "id_workout")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Workout workout;

    @OneToMany(mappedBy = "activity")
    private List<Result> results;

}
