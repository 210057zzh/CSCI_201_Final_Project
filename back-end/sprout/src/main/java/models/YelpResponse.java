package models;

import java.util.Arrays;

public class YelpResponse {
	YelpBusiness[] businesses;

	@Override
	public String toString() {
		return "YelpResponse [businesses=" + Arrays.toString(businesses) + "]";
	}

	public String getFirstBusinessId() {
		return this.businesses[0].getId();
	}
	
	
	
}

