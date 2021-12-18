package com.sbu.redistrictingserver;


import com.sbu.redistrictingserver.controller.FoodiesController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Arrays;

@SpringBootApplication
public class RedistrictingServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(RedistrictingServerApplication.class, args);
		System.out.println("Hello from Server...");
	}

}
