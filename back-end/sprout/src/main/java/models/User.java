package models;

public class User {
	private int userID;
	private String email;
	private int idToken;
	private boolean googleUser;
	private String password;
	
	
	public User(int userID, String email, String password, boolean googleUser) {
		super();
		this.userID = userID;
		this.email = email;
		this.googleUser = googleUser;
		this.password = password;
	}


	public int getUserID() {
		return userID;
	}


	public void setUserID(int userID) {
		this.userID = userID;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public int getIdToken() {
		return idToken;
	}


	public void setIdToken(int idToken) {
		this.idToken = idToken;
	}


	public boolean isGoogleUser() {
		return googleUser;
	}


	public void setGoogleUser(boolean googleUser) {
		this.googleUser = googleUser;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
	
	

}
