package com.gymbasics.gymbasics;

import com.gymbasics.gymbasics.entities.Customer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GymbasicsApplication {

	public static void main(String[] args) {

		Customer asd = new Customer();
		asd.getAddress();



		SpringApplication.run(GymbasicsApplication.class, args);
	}

}
