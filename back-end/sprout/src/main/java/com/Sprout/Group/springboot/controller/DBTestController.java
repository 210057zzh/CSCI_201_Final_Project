package com.Sprout.Group.springboot.controller;

import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.jdbc.core.JdbcTemplate;


@RestController
public class DBTestController {

	private final JdbcTemplate jdbcTemplate;
	
	//add this stuff to other controllers, I believe there is a way to
	//make it global, but I think this works and is easy enough
	public DBTestController(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	@RequestMapping("/dbtest")
	public List<String> listUsers() {
		return this.jdbcTemplate.queryForList("SELECT * FROM Users").stream()
				.map(m -> m.values().toString())
				.collect(Collectors.toList());
		//this works too
		//this.jdbcTemplate.queryForList(YOUR_QUERY)
		//RETURNS List<Map<String,Object>>, basically list of key value pairs
		//THROWS DataAccessException
		//Link to documentation:
		//https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jdbc/core/JdbcTemplate.html#queryForList-java.lang.String-java.lang.Object:A-int:A-
	}


}