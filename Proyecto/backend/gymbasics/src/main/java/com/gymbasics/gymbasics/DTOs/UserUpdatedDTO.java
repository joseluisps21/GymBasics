package com.gymbasics.gymbasics.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdatedDTO {
    private String name;
    private String email;
    private String level;
    private String focus;
    private String weight;
}
