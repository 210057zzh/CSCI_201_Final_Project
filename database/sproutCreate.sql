
CREATE DATABASE sproutCSCI201;

USE sproutCSCI201;

CREATE TABLE Users ( 
	userID int NOT NULL AUTO_INCREMENT,
    username varchar(255),
    password varchar(255),
    idToken varchar(255),
    isGoogle boolean,
    CONSTRAINT PK_Users PRIMARY KEY (userID)
); 
-- run this on your local side, and change ur dbAddress to match this location for now.

CREATE TABLE Businesses ( 
	businessID int NOT NULL AUTO_INCREMENT,
    userID int NOT NULL,
    name varchar(255),
    phone_number varchar(5),
    startHour int,
    endHour int,
    description varchar(255),
    cost int,
    review_count int,
    average_rating int,
    address varchar(255),
    business_type varchar(100),  
    CONSTRAINT PK_Bus PRIMARY KEY (businessID),
	FOREIGN KEY (userID) REFERENCES Users(userID)
); 

CREATE TABLE Reviews (
	reviewID int NOT NULL auto_increment,
    userID int NOT NULL,
    businessID int NOT NULL,
    message varchar(255),
    rating int,
    time date,
    CONSTRAINT PK_Reviews PRIMARY KEY (reviewID),
	FOREIGN KEY (userID) REFERENCES Users(userID),
	FOREIGN KEY (businessID) REFERENCES Businesses(businessID)
);