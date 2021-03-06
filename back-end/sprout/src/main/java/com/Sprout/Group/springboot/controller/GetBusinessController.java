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
public class GetBusinessController {
	
	private final JdbcTemplate jdbcTemplate;

	public GetBusinessController(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@GetMapping("/myBusinesses")
	public String GetMyBusinesses(@RequestParam int userID) {
		var businesses =  this.jdbcTemplate.queryForList("SELECT * FROM Businesses where userID="+userID).stream()
				.collect(Collectors.toList());
		
		if(businesses.size()==0) {
			return "NO RESULTS";
		}

		Gson gson = new GsonBuilder().create();

		String resultsString = gson.toJson(businesses);

		return resultsString;
	}
	
	@GetMapping("/businessInfo")
	public String GetBusinessInfo(@RequestParam int businessID) {
		System.out.println("business info" + businessID);
		var businesses =  this.jdbcTemplate.queryForList("SELECT * FROM Businesses where businessID="+businessID).stream()
				.collect(Collectors.toList());
		
		if(businesses.size()==0) {
			return "NO RESULTS";
		}

		Gson gson = new GsonBuilder().create();

		String resultsString = gson.toJson(businesses);

		return resultsString;
	}
}
