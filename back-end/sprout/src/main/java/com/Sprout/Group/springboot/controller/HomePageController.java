package com.Sprout.Group.springboot.controller;

import static utils.Constants.dbAddress;
import static utils.Constants.origins;
import static utils.Utils.queryBusinesses;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

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
			ps = conn.prepareStatement(
					"SELECT * FROM Business WHERE name LIKE ? OR business_type LIKE ? OR address LIKE ? or phone_number LIKE ?");
			for (int i = 1; i < 5; i++) {
				ps.setString(i, "%" + search + "%");
			}

			rs = ps.executeQuery();
			results = queryBusinesses(rs);
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

		// Jsonifies and returns results or "NO RESULTS"

		if (results.size() == 0) {
			return "NO RESULTS";
		}

		Gson gson = new GsonBuilder().create();

		String resultsString = gson.toJson(results);

		System.out.println(resultsString);

		return resultsString;

	}
}
