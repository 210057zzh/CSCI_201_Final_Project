package com.Sprout.Group.springboot.controller;

import static utils.Constants.dbAddress;
import static utils.Utils.queryUser;
import static utils.Constants.googleClientId;
import static utils.Constants.origins;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import models.User;

@CrossOrigin(origins = origins)
@RestController
@RequestMapping("/api")
public class LoginController {
	
	private final JdbcTemplate jdbcTemplate;

	public LoginController(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	// Recieves a user token and returns a JSON with the following attrbutes
	// {registered: boolean, userId: int}
	// userId will be -1 if registered is false
	@PostMapping("/googlelogin")
	public String getLoginInfo(@RequestBody String idTokenString) throws GeneralSecurityException, IOException {
		User token=null;
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

			
			token = getUserInfo(email, userId);
			System.out.println(token);

		} else {
			System.out.println("Invalid ID token.");
			retString = "{\"successful\": false, \"userId\":-1}";
		}
		
		if(token.getUserID()!=-1) {
			retString = "{\"successful\": true, \"userId\":"+token.getUserID()+", \"username\": \""+token.getEmail()+"\"}";
		}else {
			retString = "{\"successful\": false, \"userId\":-1}";
		}
				
		return retString;
	}
	
	//Recieves an username and password and checks if the user is registered and/or provided the right email
	// {successful: boolean, userId: int, error: String}
	// userId will be -1 if registered is false
	// there will be no error is successful is true
	@PostMapping("/login")
	public String loginUser(@RequestBody String[] credentials) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String username = credentials[0];
		String password = credentials[1];
		
		//If they did not provide a password or username, send back the unsuccessful default with blankfield error
		if(username.equals("")||password.equals("")) {
			return "{\"successful\": false, \"userId\":-1, \"error\":\"Please fill out all fields\"}";
		}
		
		//First get the user data associated with the email
		User user = getUserInfo(username);
		System.out.println(user);
		
		//Now that we have user data, check if user is real
		if(user ==null) {
			//Return the unsuccessful defaults
			return  "{\"successful\": false, \"userId\":-1, \"error\":\"Please sign up for an account\"}";
		}
		
		if(user.getUserID()==-1) {
			//Return the unsuccessful defaults
			return  "{\"successful\": false, \"userId\":-1, \"error\":\"Please sign up for an account\"}";
		}
		
		
		//Check if the user is a google user
		if(user.isGoogleUser()) {
			//Return the unsuccessful defaults
			return "{\"successful\": false, \"userId\":-1, \"error\":\"Please sign in with Google\"}";
		}
		
		//Check if the user entered the right password
		if(!user.getPassword().equals(password)) {
			//Return the unsuccessful defaults
			return "{\"successful\": false, \"userId\":-1, \"error\":\"Incorrect Password\"}";
		}
		
		
		//If the code has made it this far, the user is logged in. return success
		return "{\"successful\": true, \"userId\":"+user.getUserID()+", \"username\": \""+user.getUsername()+"\"}";
	}

	//Returns a User with a real id or an id of -1
	public User getUserInfo(String username) {
		var users =  this.jdbcTemplate.queryForList("SELECT * FROM Users WHERE username=\""+username+"\"").stream()
				.collect(Collectors.toList());
				
		if(users.size()>=1) {
			return queryUser(users);
		}else {//failed
			return new User(-1);
		}
	}
	
	//Returns a User with a real id or an id of -1
	public User getUserInfo(String username, String password) {
		var users =  this.jdbcTemplate.queryForList("SELECT * FROM Users WHERE username=\""+username+"\" AND password = \""+password+"\"").stream()
				.collect(Collectors.toList());
				
		if(users.size()>=1) {
			return queryUser(users);
		}else {//failed
			return new User(-1);
		}
	}

}
