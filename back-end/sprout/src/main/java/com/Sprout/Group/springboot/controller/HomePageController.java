package com.Sprout.Group.springboot.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import models.Business;

import org.springframework.web.bind.annotation.RequestParam;

import static utils.Constants.dbAddress;
import static utils.Constants.origins;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@CrossOrigin(origins = origins)
@RestController
@RequestMapping("/api")
public class HomePageController {
	
	@GetMapping("/businesses")
	public String getSearchResponse(@RequestParam String search) {
		
		// Gets results
		ArrayList<Business> results = new ArrayList<>();
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		
		try {
			conn = DriverManager.getConnection(dbAddress);
			//TODO may have to edit this statement. I am assuming email is the username
			ps = conn.prepareStatement("SELECT * FROM Business WHERE name=? OR business_type=? OR address=? or phone_number=?");
			for(int i =1; i<5;i++) {
				ps.setString(i, search);
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
		
		//Jsonifies and returns results or "NO RESULTS"
		
		if(results.size()==0) {
			return "NO RESULTS";
		}
		
		Gson gson = new GsonBuilder().create();
		
		String resultsString = gson.toJson(results);
		
		System.out.println(resultsString);
		
		return resultsString;
		
	}	
}
