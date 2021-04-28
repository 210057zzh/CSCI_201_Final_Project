package com.Sprout.Group.springboot.controller;

import static utils.Constants.dbAddress_nopass;
import static utils.Constants.origins;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.stream.Collectors;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
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
public class FavoritesController {
	
	private final JdbcTemplate jdbcTemplate;

	public FavoritesController(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	//Takes in the business id and user id and responds whether the business is a favorite
	@GetMapping("/isFavorite")
	public String isFavorite(@RequestParam int userID, @RequestParam int businessID) {
		var favorites =  this.jdbcTemplate.queryForList("SELECT * FROM Favorites where userID="+userID+" and businessID="+businessID).stream()
				.collect(Collectors.toList());
				
		if(favorites.size()>=1) {
			return "{\"isFavorite\":true}";
		}else {
			return "{\"isFavorite\":false}";
		}
	}
	
	//Takes in the business id and user id and adds the business to the favorites database
	@GetMapping("/addFavorite")
	public String addFavorite(@RequestParam int userID, @RequestParam int businessID) {		
		try {
			String url = dbAddress_nopass;
			DriverManagerDataSource dataSource = new DriverManagerDataSource(url, "root", "root");
			SimpleJdbcInsert simpleJdbcInsert = new SimpleJdbcInsert(dataSource).withTableName("Favorites");
			Map<String, Object> parameters = new HashMap<String, Object>();
			
			parameters.put("userID", userID);
			parameters.put("businessID", businessID);
			
			int return_value = simpleJdbcInsert.execute(parameters);
			
			if(return_value==0) {
				return "{\"success\":false}";
			}else {
				return "{\"success\":true}";
			}
		}catch(Exception e) {
			return "{\"success\":false}";
		}
	}
	
	//Takes in the business id and user id and removes the business from the favorites table
	@GetMapping("/removeFavorite")
	public String removeFavorite(@RequestParam int userID, @RequestParam int businessID) {
		try {
			String deleteQuery = "delete from Favorites where userID = ? and businessId=?";
			jdbcTemplate.update(deleteQuery, userID, businessID);
			return "{\"success\":true}";
		}catch(Exception e) {
			return "{\"success\":false}";
		}
	}
	
	//Takes in a user id and returns all the favorites's business info
	@GetMapping("/getUserFavorites")
	public String getUserFavorites(@RequestParam int userID) {
		var favorites =  this.jdbcTemplate.queryForList("SELECT * FROM Favorites where userID="+userID).stream()
				.collect(Collectors.toList());
		
		String retString="{[";
		Gson gson = new GsonBuilder().create();
		ArrayList<Map<String, Object>> businesses = new ArrayList<>();
		
		for(Map<String, Object> favorite: favorites) {
			var business = this.jdbcTemplate.queryForList("Select * From Businesses where businessID="+favorite.get("businessID")).stream()
					.collect(Collectors.toList());
			businesses.add(business.get(0));
		}
		
		return gson.toJson(businesses);
	}
}
