package com.Sprout.Group.springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Connection;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import static utils.Constants.dbAddress;
import static utils.Constants.googleClientId;
import static utils.Constants.origins;
import static utils.Constants.discoverPageBusinessLimit;
import java.util.ArrayList;
import models.Business;


@CrossOrigin(origins = origins)
@RestController
@RequestMapping("/api")
public class DiscoverController {

	@GetMapping("/discover")
	public String discoverBusinesses(@RequestParam String category) {
		ArrayList<Business> results = new ArrayList<>();
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		String SQLQuery;
		
		System.out.println("category:" +category);
		
		
		
		try {
			conn = DriverManager.getConnection(dbAddress);
			
			//Sets the SQL Query based on whether or not we are provided a category
			if(category==null || category=="") {
				System.out.println("hellow");
				ps=conn.prepareStatement("SELECT * FROM Business ORDER BY average_rating DESC LIMIT ?");
				ps.setInt(1, discoverPageBusinessLimit);
		
			}else {
				ps=conn.prepareStatement("SELECT * FROM Business WHERE business_type = ? ORDER BY average_rating DESC LIMIT ?");
				ps.setString(1, category);
				ps.setInt(2, discoverPageBusinessLimit);
			}
						
			rs = ps.executeQuery();
			while(rs.next()) {
				int businessID = rs.getInt("businessID");
				int ownerID = rs.getInt("ownerID");
				String name = rs.getString("name");
				int phone_number = rs.getInt("phone_number");
				int startHour = rs.getInt("startHour");
				int endHour = rs.getInt("endHour");
				String description = rs.getString("description");
				int cost = rs.getInt("cost");
				int average_rating = rs.getInt("average_rating");
				String address = rs.getString("address");
				String business_type = rs.getString("business_type");
				
				Business business = new Business(businessID, ownerID, name, phone_number, startHour, endHour, description, cost, average_rating, address, business_type);
				results.add(business);
				
			}
		}catch(SQLException sqle){
			//TODO handle
			System.out.println(sqle.getMessage());
		}finally {
			try {
				if(rs!=null) {
					rs.close();
				}
				if(ps!=null) {
					ps.close();
				}
				if(conn!=null) {
					conn.close();
				}
			}catch(SQLException sqle) {
				//TODO handle
				System.out.println(sqle.getMessage());
			}
		}
		
		for(Business b: results) {
			System.out.println(b);
		}
		
		if(results.size()==0) {
			return "NO RESULTS";
		}
		
		Gson gson = new GsonBuilder().create();
		
		String resultsString = gson.toJson(results);
		
		System.out.println(resultsString);
		
		return resultsString;
		
		
		//TODO if no business results in given category, then just return top rated businesses overall
	}
	
}
