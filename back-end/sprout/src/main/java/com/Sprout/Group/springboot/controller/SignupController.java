package com.Sprout.Group.springboot.controller;

import static utils.Constants.dbAddress_nopass;
import static utils.Constants.origins;
import static utils.Utils.getCurrentDate;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.stream.Collectors;
import java.util.*;


import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import models.Business;
import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime; 

@CrossOrigin(origins = origins)
@RestController
@RequestMapping("/api")
public class SignupController {
	
	private final JdbcTemplate jdbcTemplate;

	public SignupController(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	@PostMapping("/signup")
	public String signup(@RequestBody String[] credentials) {
		
		//first make sure that the user isnt already in the database
		boolean registered = doesUserExist(credentials);
		
		if(registered) {
			System.out.println("User already exists");
			return "{\"successful\": false, \"error\": \"User already exists\"}"; 
		}
		
		System.out.println("signing up "+credentials[0]+credentials[1]);
		
		String url = dbAddress_nopass;
		DriverManagerDataSource dataSource = new DriverManagerDataSource(url, "root", "root");
		SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(dataSource).withTableName("Users");
		Map<String, Object> parameters = new HashMap<String, Object>();
		parameters.put("username", credentials[0]);
		parameters.put("password", credentials[1]);
		parameters.put("googleuser", false);
		int return_value = simpleJdbcInsert.execute(parameters);
		
		if(return_value>=1) {
			return "{\"successful\": true}";
		}else {
			return "{\"successful\": false, \"error\": \"Unspecified\"}";
		}		
				
	}
	
	public boolean doesUserExist(String[] credentials) {
		var users =  this.jdbcTemplate.queryForList("SELECT userID FROM Users WHERE username=\""+credentials[0]+"\" AND password=\""+credentials[1]+"\"").stream()
				.map(m -> m.values().toString())
				.collect(Collectors.toList());
		
		if(users.size()>0) {
			return true;
		}
		
		return false;
	}

}
