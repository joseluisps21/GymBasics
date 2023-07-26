package com.gymbasics.gymbasics.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserDTO {
    private Long id;
    private String name;
    private String username;
    private String email;
    private String level;
    private String focus;
    private String plan;

}






