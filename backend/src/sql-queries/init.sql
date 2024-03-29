
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
    color VARCHAR(255) NOT NULL,
    subject VARCHAR(255)
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
    username VARCHAR(20) PRIMARY KEY,
    school VARCHAR(255),
    reputation VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    points INT NOT NULL,
    dateJoined DATE NOT NULL,  
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
    isPublic BOOLEAN NOT NULL,
    description VARCHAR(255) NOT NULL,
    lastOpened DATE NOT NULL,
    parsedText TEXT NOT NULL,
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



INSERT INTO `cpsc304`.`AchievementLevel` (`difficulty`, `points`, `borderColor`) VALUES ('medium', '12', 'yellow');
INSERT INTO `cpsc304`.`AchievementLevel` (`difficulty`, `points`, `borderColor`) VALUES ('easy', '5', 'green');
INSERT INTO `cpsc304`.`AchievementLevel` (`difficulty`, `points`, `borderColor`) VALUES ('very very hard', '40', 'dark red');

INSERT INTO `Color` (`name`, `primaryColor`, `gradient`, `circle`) VALUES ('pink', '#F5878D', '#B9568C', '#B9568C');
INSERT INTO `Color` (`name`, `primaryColor`, `gradient`, `circle`) VALUES ('blue', '#22B0D2', '#1455CE', '#1455CE');
INSERT INTO `Color` (`name`, `primaryColor`, `gradient`, `circle`) VALUES ('red', '#5F77B3', '#29784D', '#3D1903');
INSERT INTO `Color` (`name`, `primaryColor`, `gradient`, `circle`) VALUES ('green', '#9D2EB3', '#29140D', '#3A1E73');
INSERT INTO `Color` (`name`, `primaryColor`, `gradient`, `circle`) VALUES ('purple', '#5F2EB3', '#29144D', '#3D1E73');
INSERT INTO `Color` (`name`, `primaryColor`, `gradient`, `circle`) VALUES ('default', '#5F2EB3', '#29144D', '#3D1E73');

INSERT INTO `Reputation` (`reputation`, `borderColor`) VALUES ('-10x Engineer', 'red');

-- password = 123 
INSERT INTO `User` (`username`, `school`, `reputation`, `password`, `email`, `points`, `dateJoined`) VALUES ('test', NULL, '-10x Engineer', '$2a$12$QjD0Tuf61pgaHJsYfgVYYutHmjkqd7LQBtG4UmW0N/fhNvQebZrty', NULL, 0, NOW());
-- password = 1231 
INSERT INTO `User` (`username`, `school`, `reputation`, `password`, `email`, `points`, `dateJoined`) VALUES ('test1', NULL, '-10x Engineer', '$2a$12$X1Q6kRKx2VLZt6/kqD0yzeB.bzfvouO6wrBG7TWFi/rArv3dXgkWa', NULL, 0, NOW());
-- password = 1232 
INSERT INTO `User` (`username`, `school`, `reputation`, `password`, `email`, `points`, `dateJoined`) VALUES ('test2', NULL, '-10x Engineer', '$2a$12$E/GQJdihSF5J5LbPZG3GseottdZwI.bdTiSHApmeWBFXMr.4gSI1.', NULL, 0, NOW());
-- password = 1233 
INSERT INTO `User` (`username`, `school`, `reputation`, `password`, `email`, `points`, `dateJoined`) VALUES ('test3', NULL, '-10x Engineer', '$2a$12$p7JWlhTRCD/uqKQ/69clB.rjocQWFPbvCWZHpYYR4kyxII/Yrlh/K', NULL, 0, NOW());
-- password = 1234 
INSERT INTO `User` (`username`, `school`, `reputation`, `password`, `email`, `points`, `dateJoined`) VALUES ('test4', NULL, '-10x Engineer', '$2a$12$OyKEGFL/o7qDv6sfvECZTOKnQGFcacKKuDsGBLSRwnEe70o1Oj20C', NULL, 0, NOW());
-- password = 1235 
INSERT INTO `User` (`username`, `school`, `reputation`, `password`, `email`, `points`, `dateJoined`) VALUES ('test5', NULL, '-10x Engineer', '$2a$12$Rb/z345ws1faXhFAuI8LUOWLSyPr96lKmM8VeyYr2IAbssURmtLdu', NULL, 0, NOW());

INSERT INTO CreatesTopic (id, username, title, isPublic, description, lastOpened, color) VALUES
    ('1', 'test', 'Phys901', true, 'Random fake description very fake pretend this is a description', NOW(), 'blue'),
    ('2', 'test', 'Chem123', false, 'idk what to write here bro', NOW(), 'green'),
    ('3', 'test', 'Math049', false, 'Man my neck hurts', NOW(), 'red'),
    ('4', 'test', 'Cpsc304', true, 'blah blah blah blah blah blah blah ahhhhhhhhhhhh', NOW(), 'blue'),
    ('5', 'test', 'Hello World', false, 'someone save me im not creative enough to come up with these', NOW(), 'green'),
    ('6', 'test', 'How to swim', false, 'description here', NOW(), 'red'),
    ('7', 'test', 'Bible studies', true, 'description here 2', NOW(), 'blue');

INSERT INTO Tag (name, color, subject) VALUES
    ('Physics', '#5F2EB3', 'Science'),
    ('Chemistry', '#FF7A8B', 'Science'),
    ('Math', '#22B0D2', 'Science'),
    ('Biology', '#399CFF', 'Science'),
    ('Waves', '#9D3CA1', 'Science'),
    ('Showering', '#5F2EB3', 'Public Safety');

INSERT INTO Has (tagName, topicId) VALUES
    ('Physics', '1'),
    ('Chemistry', '2'),
    ('Math', '3'),
    ('Biology', '2'),
    ('Waves', '1'),
    ('Chemistry', '6'),
    ('Chemistry', '5'),
    ('Showering', '7');

INSERT INTO StudyMaterialType (type, icon) VALUES
    ('Quiz', '1'),
    ('Notes', '2'),
    ('Flashcards', '3');

INSERT INTO ContainsStudyMaterial (title, topicId, type, isPublic, description, lastOpened, parsedText, highScore) 
VALUES ('Wave Interference', '1', 'Notes', TRUE, 'Description', '2025-01-25', 'a wqr 512qwa es qwT', 69),
       ('Simple Harmonic Motion', '2', 'Flashcards', TRUE, 'Description', '1992-02-12', 'b aw wq wfqf qwqw  ', 19),
       ('Difficult Harmonic Motion', '2', 'Flashcards', TRUE, 'Description', '1999-02-12', 'c D E f g h i k', 99),
       ('Standing Waves', '1', 'Quiz', TRUE, 'Description', '2937-04-02', 'do not stand, sit', 9),
       ('1', '2', 'Notes', FALSE, 'Description', '2006-01-20', 'what am I doing', 26),
       ('2', '5', 'Flashcards', FALSE, 'Description', '1078-09-28', 'spacessss     spacessss     ', 20),
       ('3', '6', 'Notes', FALSE, 'Description', '3057-02-09', 'lots of words here word word word word word', 7),
       ('4', '7', 'Quiz', FALSE, 'Description', '2004-12-30', 'dummy dumbo', 32);

INSERT INTO Likes (studyMaterialTitle, topicId, username) 
VALUES ('Wave Interference', '1', 'test'),
       ('Simple Harmonic Motion', '2', 'test'),
       ('Standing Waves', '1', 'test'),
       ('1', '2', 'test'),
       ('2', '5', 'test'),
       ('3', '6', 'test'),
       ('4', '7', 'test'),
       ('Wave Interference', '1', 'test2'),
       ('Simple Harmonic Motion', '2', 'test2'),
       ('Standing Waves', '1', 'test2'),
       ('1', '2', 'test2'),
       ('Simple Harmonic Motion', '2', 'test3'),
       ('Wave Interference', '1', 'test3'),
       ('Wave Interference', '1', 'test4'),
       ('Wave Interference', '1', 'test5'),
       ('Simple Harmonic Motion', '2', 'test4'),
       ('Standing Waves', '1', 'test3'),
       ('1', '2', 'test5'),
       ('2', '5', 'test4'),
       ('3', '6', 'test4'),
       ('4', '7', 'test4');

INSERT INTO QuizQuestionDifficulty (type, icon) VALUES
    ('MCQ', '1'),
    ('Short Answer', '2');

INSERT INTO OwnsQuizQuestion (id, studyMatTitle, topicId, type, question, answer, points) 
VALUES ('1', 'Standing Waves', '1', 'MCQ', 'What is a standing wave?', 'a wave that stands', 10),
       ('2', 'Standing Waves', '1', 'Short Answer', 'What is the period of the wave?', '4pi', 10),
       ('3', 'Standing Waves', '1', 'MCQ', 'What is the tension on the string?', '17N', 20),
       ('4', '4', '7', 'Short Answer', 'What the type of Klinklang?', 'Steel', 200),
       ('5', '4', '7', 'Short Answer', 'What is the signature move of Klinklang?', 'Flash Cannon', 500),
       ('6', '4', '7', 'Short Answer', 'What gen was Toxapex introduced?', 'Gen VII', 300),
       ('7', '4', '7', 'MCQ', 'What is the first evolution of Toxapex?', 'Mareanie', 2000),
       ('8', 'Standing Waves', '1', 'Short Answer', 'Calculate the frequency of the two waves?', '100GHz', 30),
       ('9', 'Standing Waves', '1', 'Short Answer', 'Is this constructive or destructive interference?', 'constructive', 10),
       ('10', 'Standing Waves', '1', 'MCQ', 'Which string has a shorter frequency?', 'string 1', 20),
       ('11', '4', '7', 'MCQ', 'What is the signature move of Toxapex?', 'Baneful Bunker', 1000);

INSERT INTO OwnsCard (id, studyMatTitle, topicId, question, answer, image) 
VALUES ('1', 'Simple Harmonic Motion', '2', 'What is a standing wave?', 'a wave that stands', 'image1'),
       ('2', 'Difficult Harmonic Motion', '2', 'What is the period of the wave?', '4pi', 'image2'),
       ('3', 'Difficult Harmonic Motion', '2', 'What is the tension on the string?', '17N', 'image3'),
       ('4', '2', '5', 'What the type of Klinklang?', 'Steel', 'image4'),
       ('5', '2', '5', 'What is the signature move of Klinklang?', 'Flash Cannon', 'image5'),
       ('6', '2', '5', 'What gen was Toxapex introduced?', 'Gen VII', 'image6'),
       ('7', '2', '5', 'What is the first evolution of Toxapex?', 'Mareanie', 'image7'),
       ('8', 'Simple Harmonic Motion', '2', 'Calculate the frequency of the two waves?', '100GHz', 'image8'),
       ('9', 'Difficult Harmonic Motion', '2', 'Is this constructive or destructive interference?', 'constructive', 'image9'),
       ('10', 'Simple Harmonic Motion', '2', 'Which string has a shorter frequency?', 'string 1', 'image10'),
       ('11', '2', '5', 'What is the signature move of Toxapex?', 'Baneful Bunker', 'image11');