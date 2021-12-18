CREATE SCHEMA IF NOT EXISTS FoodiesPublicM3;

USE FoodiesPublicM3;


DROP TABLE IF EXISTS Checkins;
DROP TABLE IF EXISTS Tips;
DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS Hours;
DROP TABLE IF EXISTS Business;
DROP TABLE IF EXISTS Coordinate;
DROP TABLE IF EXISTS Attributes;
DROP TABLE IF EXISTS TakeOutRestaurant;
DROP TABLE IF EXISTS Bar;
DROP TABLE IF EXISTS SitDownRestaurant;
DROP TABLE IF EXISTS Users;


CREATE TABLE Users
(
    UserId            VARCHAR(50),
    Name              VARCHAR(255),
    ReviewCount       INT,
    YelpingSince      TIMESTAMP,
    Useful            INT,
    Funny             INT,
    Cool              INT,
    Elite             VARCHAR(255),
#     Friends           LONGTEXT, # list of users
    Friends           INT,
    Fans              INT,
    AverageStars      DECIMAL,
    ComplimentHot     INT,
    ComplimentMore    INT,
    ComplimentProfile INT,
    ComplimentCute    INT,
    ComplimentList    INT,
    ComplimentNote    INT,
    ComplimentPlain   INT,
    ComplimentCool    INT,
    ComplimentFunny   INT,
    ComplimentWriter  INT,
    ComplimentPhotos  INT,
    CONSTRAINT pk_Users_UserId PRIMARY KEY (UserId)
);



CREATE TABLE Business
(
    BusinessId  VARCHAR(50),
    Name        VARCHAR(100),
    Address     LONGTEXT,
    City        VARCHAR(50),
    State       VARCHAR(50),
    PostalCode  VARCHAR(50),
    Latitude    VARCHAR(255),
    Longitude   VARCHAR(255),
    Stars       FLOAT,
    ReviewCount INT,
    IsOpen      BOOL,
    Categories  LONGTEXT,
    CONSTRAINT pk_Business_BusinessId PRIMARY KEY (BusinessId)
);



CREATE TABLE Attributes
(
    BusinessId                 VARCHAR(50),
# import .csv must be 1 not true
    BusinessAcceptsCreditCards BOOL,
    RestaurantsTableService    BOOL,
    RestaurantsTakeOut         BOOL,
    Open24Hours                BOOL,
    RestaurantsDelivery        BOOL,
    DriveThru                  BOOL,
    HasTV                      BOOL,
    WIFI                       BOOL,
    Alcohol                    BOOL,

    CONSTRAINT pk_Attributes_BusinessId PRIMARY KEY (BusinessId)
);






CREATE TABLE Hours
(
    BusinessId VARCHAR(50),
    Monday     VARCHAR(50),
    Tuesday    VARCHAR(50),
    Wednesday  VARCHAR(50),
    Thursday   VARCHAR(50),
    Friday     VARCHAR(50),
    Saturday   VARCHAR(50),
    Sunday     VARCHAR(50),

    CONSTRAINT pk_Hours_BusinessId PRIMARY KEY (BusinessId)
);



CREATE TABLE Reviews
(
    ReviewId   VARCHAR(50),
    UserId     VARCHAR(50),
    BusinessId VARCHAR(50),

    Stars      DECIMAL,
    Useful     INT,
    Funny      INT,
    Cool       INT,
    Text       LONGTEXT,
    Time       TIMESTAMP,
    CONSTRAINT pk_Reviews_ReviewId PRIMARY KEY (ReviewId),
    CONSTRAINT fk_Reviews_UserId FOREIGN KEY (UserId)
        REFERENCES Users (UserId)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_Reviews_BusinessId FOREIGN KEY (BusinessId)
        REFERENCES Business (BusinessId)
        ON UPDATE CASCADE ON DELETE SET NULL
);



CREATE TABLE Tips
(
    TipId           INT AUTO_INCREMENT,
    UserId          VARCHAR(50),
    BusinessId      VARCHAR(50),

    Text            LONGTEXT,
    Time            TIMESTAMP,
    ComplimentCount INT,

    CONSTRAINT pk_Tips_TipId PRIMARY KEY (TipId),
    CONSTRAINT fk_Tips_UserId FOREIGN KEY (UserId)
        REFERENCES Users (UserId)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_Tips_BusinessId FOREIGN KEY (BusinessId)
        REFERENCES Business (BusinessId)
        ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE Checkins
(
    CheckinId  INT AUTO_INCREMENT,
    BusinessId VARCHAR(50),

    Time       TIMESTAMP,

    CONSTRAINT pk_Checkins_CheckinId PRIMARY KEY (CheckinId),
    CONSTRAINT fk_Checkins_BusinessId FOREIGN KEY (BusinessId)
        REFERENCES Business (BusinessId)
        ON UPDATE CASCADE ON DELETE CASCADE
);


-- SET GLOBAL local_infile=1;
    
LOAD DATA INFILE 'userWithFriends.csv'
    INTO TABLE Users
    FIELDS
    TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES;
    
select count(*) from Users;

# 2.1 million


LOAD DATA INFILE 'business.csv'
    INTO TABLE Business
    FIELDS
    TERMINATED BY ',' ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES;
# 160k

CREATE TABLE Coordinate
AS (SELECT BusinessId, Latitude, Longitude
    FROM Business);
ALTER TABLE Coordinate
    ADD CONSTRAINT pk_BusinessId PRIMARY KEY (BusinessId);



LOAD DATA INFILE 'attributes.csv'
    INTO TABLE Attributes
    FIELDS
    TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES;
# 160k


CREATE TABLE SitDownRestaurant
AS (SELECT BusinessId
    FROM Attributes
    WHERE RestaurantsTableService = TRUE);

ALTER TABLE SitDownRestaurant
    ADD CONSTRAINT pk_BusinessId PRIMARY KEY (BusinessId);

CREATE TABLE TakeOutRestaurant
AS (SELECT BusinessId
    FROM Attributes
    WHERE RestaurantsTakeOut = TRUE);
ALTER TABLE TakeOutRestaurant
    ADD CONSTRAINT pk_BusinessId PRIMARY KEY (BusinessId);



CREATE TABLE Bar
AS (SELECT BusinessId
    FROM Attributes
    WHERE Alcohol = TRUE);
ALTER TABLE Bar
    ADD CONSTRAINT pk_BusinessId PRIMARY KEY (BusinessId);



LOAD DATA INFILE 'hours.csv'
    INTO TABLE Hours
    FIELDS
    TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES;
# 160k


LOAD DATA INFILE 'review.csv'
    INTO TABLE Reviews
    FIELDS
    TERMINATED BY ',' ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES;
# 8.6 million -> 120k


ALTER TABLE Tips
    AUTO_INCREMENT = 1;

LOAD DATA INFILE 'tip.csv'
    INTO TABLE Tips
    FIELDS
    TERMINATED BY ',' ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES
    (@UnusedVariable, UserId,BusinessId,Text, Time, ComplimentCount)
    SET TipId = NULL;
# 1.1 million -> 120k


-- ALTER TABLE Checkins
--     AUTO_INCREMENT = 1;
-- LOAD DATA LOCAL INFILE '/shortVersion(120k)/checkin.csv'
--     INTO TABLE Checkins
--     FIELDS
--     TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\r\n'
--     IGNORE 1 LINES;
-- # 18.6 million -> 120k

ALTER TABLE Checkins
    AUTO_INCREMENT = 1;
LOAD DATA INFILE 'checkin.csv'
    INTO TABLE Checkins
    FIELDS
    TERMINATED BY ',' ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\r\n'
    IGNORE 1 LINES
    (@UnusedVariable, BusinessId,Time)
    SET CheckinId = NULL;


select * from Business where BusinessId = '123';
select * from Business;
select * from Business where PostalCode = '02210';

select * 
from Business 
where Categories LIKE '%Shopping%';

select *
from Business 
where (Categories LIKE '%Shopping%' OR Categories LIKE '%Restaurant%')
AND PostalCode = "02110";

select count(*) AS CC
from Business 
Where PostalCode = "10001";


SELECT * 
FROM Business 
where (Categories LIKE '%Toy Stores%'  OR Categories LIKE '%Electronics%'  OR Categories LIKE '%Fashion%'  OR Categories LIKE '%Shoe Stores%'  OR Categories LIKE '%Women''s Clothing%'  OR Categories LIKE '%Tobacco Shops%'  OR Categories LIKE '%Wine & Spirits%' )  AND PostalCode = '02110';

-- Reviews.Stars, Reviews.Time, Reviews.Text 

SELECT *
FROM Business
inner join Reviews
on Business.BusinessId
where Business.BusinessId = Reviews.BusinessId
AND PostalCode = "02110"
AND Business.BusinessId = "6H313b3O6gTULpR7fV2FsQ";


select *
from Reviews;

SELECT count(*) 
FROM Business 
left join Reviews
on Business.BusinessId = Reviews.BusinessId
where (Categories LIKE '%Restaurant%'  OR Categories LIKE '%Bars%'  OR Categories LIKE '%Coffee & Tea%' )  
AND PostalCode = '02110'
group by Business.BusinessId
order by count(*) DESC;
