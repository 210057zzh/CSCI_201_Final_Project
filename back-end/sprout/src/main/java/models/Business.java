package models;

public class Business {
	int businessId;
	int ownerId;
	String name;
	int phone_number;
	int startHour;
	int endHour;
	String description;
	int cost;
	int average_rating;
	String address;
	String business_type;
	
	public Business(int businessId, int ownerId, String name, int phone_number, int startHour, int endHour,
			String description, int cost, int average_rating, String address, String business_type) {
		this.businessId = businessId;
		this.ownerId = ownerId;
		this.name = name;
		this.phone_number = phone_number;
		this.startHour = startHour;
		this.endHour = endHour;
		this.description = description;
		this.cost = cost;
		this.average_rating = average_rating;
		this.address = address;
		this.business_type = business_type;
	}
	public int getBusinessId() {
		return businessId;
	}
	public void setBusinessId(int businessId) {
		this.businessId = businessId;
	}
	public int getOwnerId() {
		return ownerId;
	}
	public void setOwnerId(int ownerId) {
		this.ownerId = ownerId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(int phone_number) {
		this.phone_number = phone_number;
	}
	public int getStartHour() {
		return startHour;
	}
	public void setStartHour(int startHour) {
		this.startHour = startHour;
	}
	public int getEndHour() {
		return endHour;
	}
	public void setEndHour(int endHour) {
		this.endHour = endHour;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getCost() {
		return cost;
	}
	public void setCost(int cost) {
		this.cost = cost;
	}
	public int getAverage_rating() {
		return average_rating;
	}
	public void setAverage_rating(int average_rating) {
		this.average_rating = average_rating;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getBusiness_type() {
		return business_type;
	}
	public void setBusiness_type(String business_type) {
		this.business_type = business_type;
	}
	@Override
	public String toString() {
		return "Business [businessId=" + businessId + ", ownerId=" + ownerId + ", name=" + name + ", phone_number="
				+ phone_number + ", startHour=" + startHour + ", endHour=" + endHour + ", description=" + description
				+ ", cost=" + cost + ", average_rating=" + average_rating + ", address=" + address + ", business_type="
				+ business_type + "]";
	}
	
}
