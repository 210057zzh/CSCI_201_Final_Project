package com.Sprout.Group.springboot.controller;

import static utils.Constants.dbAddress;
import static utils.Constants.discoverPageBusinessLimit;
import static utils.Constants.origins;
import static utils.Utils.getPlaceholderBusinesses;
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
public class DiscoverController {

	@GetMapping("/discover")
	public String discoverBusinesses(@RequestParam String category) {
		ArrayList<Business> results = new ArrayList<>();
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		System.out.println("category:" + category);

		boolean haveResults = false;

		while (!haveResults) {
			try {
				conn = DriverManager.getConnection(dbAddress);

				// Sets the SQL Query based on whether or not we are provided a category
				if (category == null || category == "") {
					ps = conn.prepareStatement("SELECT * FROM Business ORDER BY average_rating DESC LIMIT ?");
					ps.setInt(1, discoverPageBusinessLimit);

				} else {
					ps = conn.prepareStatement(
							"SELECT * FROM Business WHERE business_type = ? ORDER BY average_rating DESC LIMIT ?");
					ps.setString(1, category);
					ps.setInt(2, discoverPageBusinessLimit);
				}

				rs = ps.executeQuery();
				results = queryBusinesses(rs);
			} catch (SQLException sqle) {
				// TODO handle
				System.out.println(sqle.getMessage());
				results = getPlaceholderBusinesses();
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
					results = getPlaceholderBusinesses();
				}
			}

			if (results.size() == 0 && category == "") {
				results = getPlaceholderBusinesses();
			}

			if (results.size() == 0) {
				category = "";
			}

			haveResults = true;

		}

		Gson gson = new GsonBuilder().create();

		String resultsString = gson.toJson(results);

		return resultsString;
	}

}
