
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS AchievementLevel;
DROP TABLE IF EXISTS `Group`;
DROP TABLE IF EXISTS Tag;
DROP TABLE IF EXISTS QuizQuestionDifficulty;
DROP TABLE IF EXISTS StudyMaterialType;
DROP TABLE IF EXISTS School;
DROP TABLE IF EXISTS Reputation;
DROP TABLE IF EXISTS Color;
DROP TABLE IF EXISTS Achievement;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Obtains;
DROP TABLE IF EXISTS CreatesTopic;
DROP TABLE IF EXISTS Has;
DROP TABLE IF EXISTS ContainsStudyMaterial;
DROP TABLE IF EXISTS OwnsQuizQuestion;
DROP TABLE IF EXISTS OwnsCard;
DROP TABLE IF EXISTS Joins;
DROP TABLE IF EXISTS Shares;
DROP TABLE IF EXISTS Likes;

SET FOREIGN_KEY_CHECKS = 1;



CREATE TABLE AchievementLevel (
    difficulty VARCHAR(255) PRIMARY KEY,
    points INT NOT NULL,
    borderColor VARCHAR(255) NOT NULL
);

CREATE TABLE `Group` (
    code CHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE Tag (
    name VARCHAR(255) PRIMARY KEY,
    color VARCHAR(255) NOT NULL
);

CREATE TABLE QuizQuestionDifficulty (
    type VARCHAR(255) PRIMARY KEY,
    icon VARCHAR(255) NOT NULL
);

CREATE TABLE StudyMaterialType (
    type VARCHAR(255) PRIMARY KEY,
    icon VARCHAR(255) NOT NULL
);

CREATE TABLE School (
    name VARCHAR(255) PRIMARY KEY,
    schoolLogo VARCHAR(255) NOT NULL
);

CREATE TABLE Reputation (
    reputation VARCHAR(255) PRIMARY KEY,
    borderColor VARCHAR(255) NOT NULL
);

CREATE TABLE Color (
  name VARCHAR(255) PRIMARY KEY,
  primaryColor CHAR(7) NOT NULL,
  gradient CHAR(7) NOT NULL,
  circle CHAR(7) NOT NULL
);

CREATE TABLE Achievement (
    title VARCHAR(255) PRIMARY KEY,
    difficulty VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    FOREIGN KEY (difficulty) REFERENCES AchievementLevel(difficulty)
);


CREATE TABLE User (
    username VARCHAR(255) PRIMARY KEY,
    school VARCHAR(255),
    reputation VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    points INT NOT NULL,
    FOREIGN KEY (school) REFERENCES School(name) ON DELETE SET NULL,
    FOREIGN KEY (reputation) REFERENCES Reputation(reputation)
);

CREATE TABLE Obtains (
    username VARCHAR(255),
    achievementTitle VARCHAR(255),
    PRIMARY KEY (username, achievementTitle),
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE,
    FOREIGN KEY (achievementTitle) REFERENCES Achievement(title) ON DELETE CASCADE
);


CREATE TABLE CreatesTopic (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    isPublic BOOLEAN NOT NULL,
    description VARCHAR(255),
    lastOpened DATE NOT NULL,
    color VARCHAR(255) NOT NULL,
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE,
    FOREIGN KEY (color) REFERENCES Color(name) ON DELETE NO ACTION
);

CREATE TABLE Has (
    tagName VARCHAR(255),
    topicId VARCHAR(255),
    PRIMARY KEY (tagName, topicId),
    FOREIGN KEY (tagName) REFERENCES Tag(name) ON DELETE CASCADE,
    FOREIGN KEY (topicId) REFERENCES CreatesTopic(id) ON DELETE CASCADE
);



CREATE TABLE ContainsStudyMaterial (
    title VARCHAR(255),
    topicId VARCHAR(255),
    type VARCHAR(255) NOT NULL,
    privacyInfo VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    lastOpened DATE,
    parsedText TEXT,
    highScore INT,
    PRIMARY KEY (title, topicId),
    FOREIGN KEY (topicId) REFERENCES CreatesTopic(id) ON DELETE CASCADE,
    FOREIGN KEY (type) REFERENCES StudyMaterialType(type) ON DELETE CASCADE
);

CREATE TABLE OwnsQuizQuestion (
    id VARCHAR(255) PRIMARY KEY,
    studyMatTitle VARCHAR(255),
    topicId VARCHAR(255),
    type VARCHAR(255) NOT NULL,
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    points INT,
    FOREIGN KEY (studyMatTitle, topicId) REFERENCES ContainsStudyMaterial(title, topicId) ON DELETE CASCADE,
    FOREIGN KEY (type) REFERENCES QuizQuestionDifficulty(type)
);

CREATE TABLE OwnsCard (
    id VARCHAR(255) PRIMARY KEY,
    studyMatTitle VARCHAR(255),
    topicId VARCHAR(255),
    question VARCHAR(255) NOT NULL,
    answer VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    FOREIGN KEY (studyMatTitle, topicId) REFERENCES ContainsStudyMaterial(title, topicId) ON DELETE CASCADE
);



CREATE TABLE Joins (
    username VARCHAR(255),
    groupCode CHAR(10),
    PRIMARY KEY (username, groupCode),
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE,
    FOREIGN KEY (groupCode) REFERENCES `Group`(code) ON DELETE CASCADE
);

CREATE TABLE Shares (
    studyMaterialTitle VARCHAR(255),
    topicId VARCHAR(255),
    groupCode CHAR(10),
    PRIMARY KEY (studyMaterialTitle, topicId, groupCode),
    FOREIGN KEY (studyMaterialTitle, topicId) REFERENCES ContainsStudyMaterial(title, topicId) ON DELETE CASCADE,
    FOREIGN KEY (groupCode) REFERENCES `Group`(code) ON DELETE CASCADE
);

CREATE TABLE Likes (
    studyMaterialTitle VARCHAR(255),
    topicId VARCHAR(255),
    username VARCHAR(255),
    PRIMARY KEY (studyMaterialTitle, topicId, username),
    FOREIGN KEY (studyMaterialTitle, topicId) REFERENCES ContainsStudyMaterial(title, topicId) ON DELETE CASCADE,
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);


-- dummy values for testing, you can keep them or delete them later

INSERT INTO `ocean`.`AchievementLevel` (`difficulty`, `points`, `borderColor`) VALUES ('medium', '12', 'yellow');
INSERT INTO `ocean`.`AchievementLevel` (`difficulty`, `points`, `borderColor`) VALUES ('easy', '5', 'green');
INSERT INTO `ocean`.`AchievementLevel` (`difficulty`, `points`, `borderColor`) VALUES ('very very hard', '40', 'dark red');