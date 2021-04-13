package com.Sprout.Group.springboot.controller;

import static utils.Constants.origins;
import static utils.Constants.token;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import models.YelpResponse;

@CrossOrigin(origins = origins)
@RestController
@RequestMapping("/api")
public class YelpAPIController {
	
	//Returns a json of business info if there is a match of the business name and address
	//Else returns -1
	@GetMapping("/yelpfill")
	public String discoverBusinesses(@RequestParam String[] businessInfo) {
		return yelpFill(businessInfo);
	}
	
	private static String yelpFill(String[] businessInfo) {
		//Formats params for url 
		//TODO may have to do more replaces than just spaces
		for(int i=0; i< businessInfo.length; i++) {
			businessInfo[i]=businessInfo[i].replace(" ", "%20");
		}
		
		final String name = businessInfo[0];
		final String address1 = businessInfo[1];
		final String city = businessInfo[2];
		final String state = businessInfo[3];
		final String country = businessInfo[4];
		
		//Get the business id
		String id="";
        
		try {
        	id = getYelpId(name, address1, city, state, country);
        }catch(IOException e){
        	e.printStackTrace();
        }
        
        //If no business could be found, return -1
        if(id=="") {
        	return "-1";
        }
        
        //Get the business information
        String info ="";
        
        try {
        	info = getYelpInformation(id);
        }catch(IOException e){
        	e.printStackTrace();
        }
        
        //If no info could be found, return -1
        if(info=="") {
        	return "-1";
        }
		
		return info;
	}
	
	private static String getYelpInformation(String id) throws IOException {
        String URLString = "https://api.yelp.com/v3/businesses/"+id;

        // Sending get request
        URL url = new URL(URLString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        

        conn.setRequestProperty("Authorization","Bearer "+token);

        conn.setRequestProperty("Content-Type","application/json");
        conn.setRequestMethod("GET");
        

        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String output;

        StringBuffer response = new StringBuffer();
        while ((output = in.readLine()) != null) {
            response.append(output);
        }

        in.close();
        // printing result from response
        return response.toString();
	}
	
	private static String getYelpId(String name, String address1, String city, String state, String country) throws IOException {
        String URLString = "https://api.yelp.com/v3/businesses/matches?name="+name+"&address1="+address1+"&city="+city+"&state="+state+"&country="+country;
		
		// Sending get request
        URL url = new URL(URLString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        

        conn.setRequestProperty("Authorization","Bearer "+token);

        conn.setRequestProperty("Content-Type","application/json");
        conn.setRequestMethod("GET");
        

        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String output;

        StringBuffer response = new StringBuffer();
        while ((output = in.readLine()) != null) {
            response.append(output);
        }
        
        Gson gson = new GsonBuilder().create();
        YelpResponse res = gson.fromJson(response.toString(), YelpResponse.class);
        
        System.out.println(res);

        in.close();
        // printing result from response
        System.out.println("Response:-" + response.toString());
		
		return res.getFirstBusinessId();
	}
}
