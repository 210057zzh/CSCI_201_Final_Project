package com.Sprout.Group.springboot;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class SproutApplication extends SpringBootServletInitializer implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SproutApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
		//Place to initialize services/database connections on start-up
		
	}

}
