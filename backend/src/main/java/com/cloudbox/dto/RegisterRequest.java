package com.cloudbox.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String firstName;
    private String lastName;
    private String gender;
    private int age;
    private String location;
    private String password;
    private String confirmPassword;

}