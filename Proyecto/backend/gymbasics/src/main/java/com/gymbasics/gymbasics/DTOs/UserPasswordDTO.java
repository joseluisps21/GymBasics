package com.gymbasics.gymbasics.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPasswordDTO {

    private String currentPassword;
    private String newPassword;
}
