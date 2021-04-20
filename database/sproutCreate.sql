
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

CREATE TABLE Businesses ( 
    businessID int NOT NULL AUTO_INCREMENT,
    userID int NOT NULL,
    name varchar(255),
    phone_number varchar(255),
    startHour varchar(255),
    endHour varchar(255),
    description varchar(255),
    otherInfo varchar(255),
    website varchar(100),
    email varchar(100),
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

-- gcloud sql connect myinstance --user=root

INSERT INTO Businesses(userID,name,phone_number,startHour,endHour,description,otherInfo,website,email,cost,review_count,average_rating,address,business_type)
VALUES
    (21,"Joe's Crab Shack", "111-222-3333","9:00","15:00","We sell crabs and other seafood","Don't serve shrimp","joescrabshack.com","seafoodjoe@gmail.com",2,0,1,"1234 Seafood Street","Restraunt"),
    (21,"Joe's Paints", "111-222-4444","9:00","20:00","We sell Paint","Don't have blue paint","joespaints.com","joepaint@gmail.com",2,1,5,"1234 Paint Street","Store");

INSERT INTO Reviews(userID,businessID,message,rating,time)
VALUES
    (21,1,"Excellent stuff",4,"1980-12-12");