package com.Sprout.Group.springboot.controller;

import static utils.Constants.dbAddress;
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

@CrossOrigin(origins = origins)
@RestController
@RequestMapping("/api")
public class LoginController {

	// Recieves a user token and returns a JSON with the following attrbutes
	// {registered: boolean, userId: int}
	// userId will be -1 if registered is false
	@PostMapping("/googlelogin")
	public String getLoginInfo(@RequestBody String idTokenString) throws GeneralSecurityException, IOException {
		boolean registered=false;
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

			System.out.println(userId);
			token = searchUser(userId, email);

		} else {
			System.out.println("Invalid ID token.");
			retString = "{\"registered\": false, \"userId\":-1}";
		}
		
		if(token!=-1) {
			retString = "{\"registered\": true, \"userId\":"+token+"}";
		}else {
			retString = "{\"registered\": false, \"userId\":-1}";
		}
		
		System.out.println(retString);
		
		return retString;
	}

	//Returns userId or -1 if user does not exist
	private int searchUser(String idToken, String email) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		Integer userID = -1;

		try {
			conn = DriverManager.getConnection(dbAddress);
			// TODO may have to edit this statement. I am assuming email is the username
			
			ps = conn.prepareStatement("SELECT userID FROM User WHERE idToken=? AND username=?");
			ps.setString(1, idToken);
			ps.setString(2, email);
			rs = ps.executeQuery();
			while (rs.next()) {
				userID = rs.getInt("userID");
				return userID;
			}
			return userID;
		} catch (SQLException sqle) {
			// TODO handle
			System.out.println(sqle.getMessage());
		} finally {
			try {
				if (rs != null) {
					rs.close();
				}
				if (ps != null) {
					ps.close();
				}
				if (conn != null) {
					conn.close();
				}
			} catch (SQLException sqle) {
				// TODO handle
				System.out.println(sqle.getMessage());
			}
		}

		return userID;
	}

}
