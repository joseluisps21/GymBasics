package com.gymbasics.gymbasics;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;

@ServletComponentScan
@SpringBootApplication
@CrossOrigin
public class GymbasicsApplication {

	public static void main(String[] args) {

		SpringApplication.run(GymbasicsApplication.class, args);
	}

}
