package com.Sprout.Group.springboot.controller;

import static utils.Constants.dbAddress;
import static utils.Constants.discoverPageBusinessLimit;
import static utils.Constants.origins;
import static utils.Utils.getPlaceholderBusinesses;
import static utils.Utils.queryBusinesses;
import static utils.Utils.queryBusiness;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import models.Business;


@CrossOrigin(origins = origins)
@RestController
@RequestMapping("/api")
public class GetReviews {
	
	private final JdbcTemplate jdbcTemplate;

	public GetReviews(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@GetMapping("/getReviews")
	public String GetMyBusinesses(@RequestParam int businessID, @RequestParam int page) {
		var reviews =  this.jdbcTemplate.queryForList("SELECT * FROM Reviews where businessID="+businessID+" ORDER BY time").stream()
				.collect(Collectors.toList());
		
		if(reviews.size()==0) {
			return "NO RESULTS";
		}
		
		ArrayList<Object> pageReviews = new ArrayList<>();
		
		for(int i =page*3-3; i<=page*3-1;i++) {
			try {
				pageReviews.add(reviews.get(i));
			}catch(IndexOutOfBoundsException e) {
				break;
			}
		}
		
		if(pageReviews.size()==0) {
			return "NO RESULTS";
		}

		Gson gson = new GsonBuilder().create();

		String resultsString = gson.toJson(pageReviews);

		return resultsString;
	}
}
