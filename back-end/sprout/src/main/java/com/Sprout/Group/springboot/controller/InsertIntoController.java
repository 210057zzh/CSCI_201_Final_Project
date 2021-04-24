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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import models.Business;
import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime;    


@CrossOrigin(origins = origins)
@RestController
@RequestMapping("/api")
public class InsertIntoController {
	
	private final JdbcTemplate jdbcTemplate;

	public InsertIntoController(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	@PostMapping("/addReview")
	public void InsertBusiness(@RequestParam int userID, @RequestParam int businessID,@RequestParam String message,@RequestParam int rating) {
		String url = dbAddress_nopass;
		DriverManagerDataSource dataSource = new DriverManagerDataSource(url, "root", "root");
		SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(dataSource).withTableName("Reviews");
		Map<String, Object> parameters = new HashMap<String, Object>();
		parameters.put("businessID", businessID);
		parameters.put("userID", userID);
		parameters.put("message", message);
		parameters.put("rating", rating);
		//parameters.put("time", getCurrentDate());
		
		int return_value = simpleJdbcInsert.execute(parameters);
		
		//recalculate average rating for this business with new review
		var reviews =  this.jdbcTemplate.queryForList("SELECT * FROM Reviews where businessID="+businessID+" ORDER BY time").stream()
				.collect(Collectors.toList());
		
		int totalReviews = reviews.size();
		int totalRating = 0;
		
		for(Map<String, Object> review: reviews) {
			totalRating+=(int) review.get("rating");
		}
		
		int newAverageRating = totalRating/totalReviews;
		
		String updateQuery = "update Businesses set average_rating=? where businessID=?";
		jdbcTemplate.update(updateQuery, newAverageRating, businessID);
		
		System.out.println("VALUE RETURNED IS :" + return_value);
	}
	@GetMapping("/addBusiness")
	public void InsertBusiness(@RequestParam int userID, @RequestParam String business_type, @RequestParam String name, @RequestParam String otherInfo, @RequestParam String email, @RequestParam String website, @RequestParam String phone_number,@RequestParam String startHour, @RequestParam String endHour, @RequestParam String description, @RequestParam int cost, @RequestParam String address) {
		String url = dbAddress_nopass;
		DriverManagerDataSource dataSource = new DriverManagerDataSource(url, "root", "root");
		SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(dataSource).withTableName("Businesses");
		Map<String, Object> parameters = new HashMap<String, Object>();
		parameters.put("userID", userID);
		parameters.put("business_type", business_type);
		parameters.put("name", name);
		parameters.put("otherInfo", otherInfo);
		parameters.put("phone_number", phone_number);
		parameters.put("email", email);
		parameters.put("website", website);
		parameters.put("startHour", startHour);
		parameters.put("endHour", endHour);
		parameters.put("description", description);
		parameters.put("cost", cost);
		parameters.put("review_count", 0);
		parameters.put("address", address);
		int return_value = simpleJdbcInsert.execute(parameters);
		System.out.println("VALUE RETURNED IS :" + return_value);
	}
}








