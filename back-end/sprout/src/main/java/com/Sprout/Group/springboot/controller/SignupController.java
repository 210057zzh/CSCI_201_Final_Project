package com.Sprout.Group.springboot.controller;

import static utils.Constants.dbAddress_nopass;
import static utils.Constants.googleClientId;
import static utils.Constants.origins;
import static utils.Utils.getCurrentDate;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
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

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import models.Business;
import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime; 

@CrossOrigin(origins = origins)
@RestController
@RequestMapping("/api")
public class SignupController {
	
	//TODO send back userId and username for this class and login
	
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
		
		boolean success = addUser(credentials[0], credentials[1], false);
		
		if(success) {
			return "{\"successful\": true}";
		}else {
			return "{\"successful\": false, \"error\": \"Unspecified\"}";
		}		
				
	}
	
	@PostMapping("/googlesignup")
	public String googlesignup(@RequestBody String idTokenString) throws GeneralSecurityException, IOException {
		System.out.println("google sign up");
		int token=-1;
		String retString="";
		
		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
				// Specify the CLIENT_ID of the app that accesses the backend:
				.setAudience(Collections.singletonList(googleClientId)).build();

		GoogleIdToken idToken = verifier.verify(idTokenString);
		if (idToken != null) {
			Payload payload = idToken.getPayload();

			// Get profile information from payload
			String userId = payload.getSubject();
			String email = payload.getEmail();
			
			//Check if they are already registered
			boolean registered = doesUserExist(new String[] {email, userId});
			
			if(registered) {
				System.out.println("User already exists");
				return "{\"successful\": false, \"error\": \"User already exists\"}"; 
			}
			
			boolean success = addUser(email, userId, true);
			
			if(success) {
				return "{\"successful\": true}";
			}else {
				return "{\"successful\": false, \"error\": \"Unspecified\"}";
			}	
			

		} else {
			System.out.println("Invalid ID token.");
			return "{\"successful\": false, \"error\": \"Invalid\"}"; 
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
	
	public boolean addUser(String username, String password, boolean googleuser) {
		String url = dbAddress_nopass;
		DriverManagerDataSource dataSource = new DriverManagerDataSource(url, "root", "root");
		SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(dataSource).withTableName("Users");
		Map<String, Object> parameters = new HashMap<String, Object>();
		parameters.put("username", username);
		parameters.put("password", password);
		parameters.put("googleuser", googleuser);
		int return_value = simpleJdbcInsert.execute(parameters);
		
		if(return_value>=1) {
			return true;
		}else {
			return false;
		}	
	}

}
