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

	@GetMapping("/business")
	public String GetBusiness(@RequestParam String name) {
		Business results = null;
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		System.out.println("BusinessName: " + name);

		boolean haveResults = false;

		while (!haveResults) {
			try {
				conn = DriverManager.getConnection(dbAddress);

				// Sets the SQL Query based on whether or not we are provided a category
				ps = conn.prepareStatement(
						"SELECT * FROM Businesses WHERE name = ?");
				ps.setString(1, name);
				rs = ps.executeQuery();
				results = queryBusiness(rs);
			} catch (SQLException sqle) {
				// TODO handle
				System.out.println(sqle.getMessage());
				results = new Business();
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
					results = new Business();
				}
			}

			haveResults = true;

		}

		Gson gson = new GsonBuilder().create();

		String resultsString = gson.toJson(results);

		return resultsString;
	}
}
