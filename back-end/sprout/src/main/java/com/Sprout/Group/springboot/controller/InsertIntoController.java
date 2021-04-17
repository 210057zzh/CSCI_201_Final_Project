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
	@GetMapping("/IntertInto")
	public void InsertBusiness(@RequestParam int userID, @RequestParam int businessID,@RequestParam String message,@RequestParam int rating) {
		String url = dbAddress_nopass;
		DriverManagerDataSource dataSource = new DriverManagerDataSource(url, "root", "root");
		SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(dataSource).withTableName("Review");
		Map<String, Object> parameters = new HashMap<String, Object>();
		parameters.put("businessID", businessID);
		parameters.put("message", message);
		parameters.put("rating", rating);
		parameters.put("time", getCurrentDate());
		int return_value = simpleJdbcInsert.execute(parameters);
		System.out.println("VALUE RETURNED IS :" + return_value);
	}
}







