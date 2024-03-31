
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
    dateCreated DATE NOT NULL,
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
    dateCreated DATE NOT NULL,
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
INSERT INTO `Reputation` (`reputation`, `borderColor`) VALUES ('Administrator', 'black');

INSERT INTO School (name, schoolLogo) VALUES
    ('Hogwarts', '1'),
    ('MIT', '2'), 
    ('Euphoria High', '3'), 
    ('Uva Academy', '4'); 

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
-- password = admin
INSERT INTO `User` (`username`, `school`, `reputation`, `password`, `email`, `points`, `dateJoined`) VALUES ('admin', 'Hogwarts', 'Administrator', '$2a$12$8j5TfAu9qYXeZHnC4i4W4OwGeHTT4uHkyWSNiqJULFkB9OdDhQHSG', 'admin@fbi.gov', 2147483647, '0000-01-01');


INSERT INTO CreatesTopic (id, username, title, isPublic, description, lastOpened, dateCreated, color) VALUES
    ('1', 'test', 'Phys901', true, 'Random fake description very fake pretend this is a description', NOW(), DATE_SUB(NOW(), INTERVAL 1 DAY), 'blue'),
    ('2', 'test', 'Chem123', false, 'idk what to write here bro', NOW(), DATE_SUB(NOW(), INTERVAL 1 DAY), 'green'),
    ('3', 'test', 'Math049', false, 'Man my neck hurts', NOW(), DATE_SUB(NOW(), INTERVAL 1 DAY), 'red'),
    ('4', 'test', 'Cpsc304', true, 'blah blah blah blah blah blah blah ahhhhhhhhhhhh', NOW(), NOW(), 'blue'),
    ('5', 'test', 'Hello World', false, 'someone save me im not creative enough to come up with these', NOW(), DATE_SUB(NOW(), INTERVAL 1 DAY), 'green'),
    ('6', 'test', 'How to swim', false, 'description here', NOW(), DATE_SUB(NOW(), INTERVAL 1 DAY), 'red'),
    ('7', 'test', 'Bible studies', true, 'description here 2', NOW(), DATE_SUB(NOW(), INTERVAL 1 DAY), 'blue');

INSERT INTO Tag (name, color, subject) VALUES
    ('Physics', '#5F2EB3', 'SCIENCE'),
    ('Chemistry', '#FF7A8B', 'SCIENCE'),
    ('Math', '#22B0D2', 'MATH'),
    ('Biology', '#399CFF', 'SCIENCE'),
    ('Waves', '#9D3CA1', 'SCIENCE'),
    ('Showering', '#5F2EB3', 'GAM'), 
    ('High Valyrian', '#2924A1', 'LANG'),
    ('Students', '#9D3CAA', 'CREATIVE'),
    ('Rain', '#ABD2A1', 'WEATHER'),
    ('Books', '#FFA87B', 'LIT'),
    ('Finance', '#2782EE', 'GAM');

INSERT INTO Has (tagName, topicId) VALUES
    ('Physics', '1'),
    ('Chemistry', '2'),
    ('Math', '3'),
    ('Biology', '2'),
    ('Waves', '1'),
    ('Chemistry', '6'),
    ('Chemistry', '5'),
    ('Showering', '7'),
    ('High Valyrian', '7'),
    ('Students', '5'),
    ('Rain', '7'),
    ('Books', '6'),
    ('Finance', '7'),
    ('Finance', '5');

INSERT INTO StudyMaterialType (type, icon) VALUES
    ('Quiz', '1'),
    ('Notes', '2'),
    ('Flashcards', '3');

INSERT INTO ContainsStudyMaterial (title, topicId, type, isPublic, description, lastOpened, dateCreated, parsedText, highScore) 
VALUES ('Wave Interference', '1', 'Notes', TRUE, 'Description', '2025-01-25', '1999-12-31', 'a wqr 512qwa es qwT', 69),
       ('Simple Harmonic Motion', '2', 'Flashcards', TRUE, 'Description', '1992-02-12', '1999-12-31', 'b aw wq wfqf qwqw  ', 19),
       ('Difficult Harmonic Motion', '2', 'Flashcards', TRUE, 'Description', '1999-02-12', '1945-08-27', 'c D E f g h i k', 99),
       ('Standing Waves', '1', 'Quiz', TRUE, 'Description', '2937-04-02', '1912-10-07', 'do not stand, sit', 9),
       ('1', '2', 'Notes', FALSE, 'Description', '2006-01-20', '1999-12-31', 'what am I doing', 26),
       ('2', '5', 'Flashcards', FALSE, 'Description', '1078-09-28', '998-06-13', 'spacessss     spacessss     ', 20),
       ('3', '6', 'Notes', FALSE, 'Description', '3057-02-09', '0000-12-25', 'lots of words here word word word word word', 7),
       ('4', '7', 'Quiz', FALSE, 'Description', '2004-12-30', '1969-04-20', 'dummy dumbo', 32);

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

INSERT INTO School (name, schoolLogo) VALUES 
('University of Toronto', '5'),
('University of British Columbia', '6'),
('McGill University', '7'),
('University of Alberta', '8'),
('McMaster University', '9'),
('University of Waterloo', '10'),
('Western University', '11'),
('Queen''s University', '12'),
('University of Calgary', '13'),
('University of Ottawa', '14'),
('University of Montreal', '15'),
('Simon Fraser University', '16'),
('University of Victoria', '17'),
('University of Manitoba', '18'),
('Dalhousie University', '19'),
('University of Saskatchewan', '20'),
('Carleton University', '21'),
('York University', '22'),
('Memorial University of Newfoundland', '23'),
('Concordia University', '24'),
('University of Guelph', '25'),
('University of Regina', '26'),
('University of Lethbridge', '27'),
('Ryerson University', '28'),
('Wilfrid Laurier University', '29'),
('University of Windsor', '30'),
('University of New Brunswick', '31'),
('University of Prince Edward Island', '32'),
('Brock University', '33'),
('University of Northern British Columbia', '34'),
('University of Sherbrooke', '35'),
('Mount Allison University', '36'),
('Thompson Rivers University', '37'),
('University of Winnipeg', '38'),
('University of Sudbury', '39'),
('Saint Mary''s University', '40'),
('Trent University', '41'),
('University of King''s College', '42'),
('Université du Québec à Montréal', '43'),
('Université de Sherbrooke', '44'),
('École de technologie supérieure (ÉTS)', '45'),
('École Polytechnique de Montréal', '46'),
('Université du Québec à Chicoutimi (UQAC)', '47'),
('Université du Québec à Trois-Rivières (UQTR)', '48'),
('Université du Québec en Outaouais (UQO)', '49'),
('Université du Québec à Rimouski (UQAR)', '50'),
('Université de Moncton', '51'),
('Mount Saint Vincent University', '52'),
('Brandon University', '53'),
('Cape Breton University', '54'),
('Université Sainte-Anne', '55'),
('Emily Carr University of Art and Design', '56'),
('Kwantlen Polytechnic University', '57'),
('Nipissing University', '58'),
('Royal Roads University', '59'),
('University Canada West', '60'),
('Algoma University', '61'),
('St. Thomas University', '62'),
('St. Francis Xavier University', '63'),
('Université de Saint-Boniface', '64'),
('Vancouver Island University', '65'),
('Acadia University', '66'),
('Athabasca University', '67'),
('St. Thomas More College', '68'),
('Trinity Western University', '69'),
('Ambrose University', '70'),
('The King''s University', '71'),
('Concordia University of Edmonton', '72'),
('MacEwan University', '73'),
('Mount Royal University', '74'),
('University of Ontario Institute of Technology', '75'),
('Redeemer University', '76'),
('Crandall University', '77'),
('First Nations University of Canada', '78'),
('Nicola Valley Institute of Technology', '79'),
('St. Stephen''s University', '80'),
('Kingswood University', '83'),
('Bethany College', '85'),
('Canada Christian College & School of Graduate Theological Studies', '86'),
('Eston College', '87'),
('Heritage College & Seminary', '88'),
('Institut Biblique du Québec', '89'),
('Master''s College and Seminary', '90'),
('Moore Theological College', '91'),
('Northern Baptist College', '92'),
('Prairie Bible Institute', '93'),
('Providence University College', '94');

INSERT INTO AchievementLevel (difficulty, points, borderColor)
VALUES ('Hard', '20', 'red'),
       ('Very Hard', '50', 'Blue'),
       ('Impossible', '1000000', 'black');

INSERT INTO Achievement (title, difficulty, image) 
VALUES ('First Topic!', 'Easy' , 'https://t.ly/FvkQO'), 
       ('First Quiz!', 'Easy' , 'https://t.ly/FvkQT'),
       ('First Flash Card Set!', 'Easy' , 'https://t.ly/FvkQU'),
       ('You Are the Best!', 'Impossible' , 'https://t.ly/FvkQI'),
       ('Learned Everything', 'Impossible' , 'https://t.ly/FvkQK');
       
INSERT INTO School (name, schoolLogo)
VALUES ('UBC', 'https://t.ly/F21s'),
       ('UBCO', 'https://t.ly/F1s'),
       ('SFU', 'https://t.ly/G21s'),
       ('KPU', 'https://t.ly/A21s');

INSERT INTO Reputation (reputation, borderColor)
VALUES ('a', 'green'),
       ('c', 'yellow'),
       ('f', 'orange'),
       ('g', 'blue'),
       ('z', 'black');

INSERT INTO User (username, school, reputation, password, email, points, dateJoined)
VALUES ('hacker101', 'UBC', 'z', '$2a$12$OPejK4n0vTI51CQ53lzg8O3yVpbkHO5W1c79QLO1F0xoS4/o6smfO', 'hacker@gmail.com', 2147483647, '2024-03-30'),
       ('i_am_a_beginner', 'UBC', 'a', '$2a$12$ZlsKZEbCvscZhzaxAi0xzOWZNNr.92JJ1T1nEj7rYbSj9eERdO1C6', 'myemail@gmail.com', 10, '2024-03-01'),
       ('smug_person', 'UBC', 'g', '$2a$12$DvDYc9CyIOlf1fp6mM/uXO8dt2JHbwrr.e3BXcaNdaSqzsndnc4ya', 'best@gmail.com', 99999, '1999-01-15'),
       ('admin2', 'UBCO', 'z', '$2a$12$vh1Xa8r1GIqcwUBvYhaRGOAnrKq3es8xOl7QHimdHNOzeke2sXLm.', 'admin@hotmail.net', 2147483647, '0001-01-02'),
       ('ditto07', 'Uva Academy', 'c', '$2a$12$7rnUr3Ud1Ttl9bjgOOSpneQrCKBYkjBEGXZ0KHaHczee9skaGPL9a', 'abc@uva.com', 11284, '2005-10-22');

-- List of passwords
-- hacker101 => SHig32b8wug
-- i_am_a_beginner => 1234
-- smug_person => lmao
-- admin2 => h21s$7
-- ditto07 => iwannabetheverybest

INSERT INTO Obtains (username, achievementTitle)
VALUES ('i_am_a_beginner', 'First Topic!'),
       ('i_am_a_beginner', 'First Quiz!'),
       ('i_am_a_beginner', 'First Flash Card Set!'),
       ('smug_person', 'You Are the Best!'),
       ('hacker101', 'Learned Everything');

INSERT INTO CreatesTopic (id, username, title, isPublic, description, lastOpened, dateCreated, color)
VALUES ('times_tables', 'i_am_a_beginner', 'times_tables', TRUE, 'multiplication practice for grade four', '2024-03-01', '2024-03-01', 'purple'),
       ('Calculus 9', 'smug_person', 'Calculus 9', TRUE, 'Secrets of the Universe', '2021-12-25', '2021-12-24', 'blue'),
       ('List of Personal Achievements', 'smug_person', 'List of Personal Achievements', TRUE, 'I am so cool', '2024-03-01', '2024-01-01', 'red'),
       ('nuclear_codes', 'admin2', 'nuclear_codes', TRUE, 'post to internet when app is dead', '2002-02-02', '1900-02-25', 'pink'),
       ('gen6pokemon', 'ditto07', 'gen6pokemon', TRUE, 'memorize gen 6 pokemon before pokemon z-a comes out', '2024-03-01', '0193-08-27', 'green');

INSERT INTO Tag (name, color, subject)
VALUES ('Games', 'green', 'GAM'),
       ('Top', 'blue', 'GAM'),
       ('UBC', 'yellow', 'LIT'),
       ('DO NOT READ', 'black', 'CREATIVE');

INSERT INTO Has (tagName, topicId)
VALUES ('Math', 'times_tables'),
       ('Math', 'Calculus 9'),
       ('Games', 'gen6pokemon'),
       ('Games', 'List Of Personal Achievements'),
       ('DO NOT READ', 'nuclear_codes');

INSERT INTO StudyMaterialType (type, icon)
VALUES ('Super Flashcard Set', 'https://t.ly/2ir2uq r2a1s'),
       ('MEGA QUIZ', 'https://t.ly/2i1i21wuia1s');

INSERT INTO ContainsStudyMaterial (title, topicId, type, isPublic, description, lastOpened, dateCreated, parsedText, highScore)
VALUES ('waterTypes', 'gen6pokemon', 'Flashcards', TRUE, 'Flashcards for memorizing gen6 water type pokemon', '2024-02-29', '2024-02-28', 'abc', NULL),
       ('steelTypes', 'gen6pokemon', 'Flashcards', FALSE, 'Flashcards for memorizing gen6 steel type pokemon', '2024-02-29', '2024-02-28', 'def', NULL),
       ('7_timestables', 'times_tables', 'Quiz', TRUE, 'SUPER HARD', '2024-03-01', '2024-03-01', 'ghi', 0.3),
       ('Quantum Computing Quadruple Integral Wave … idk some other bs', 'Calculus 9', 'Flashcards', TRUE, 'ONLY FOR SUPER SMART PEOPLE', '2021-12-25', '2021-08-26', 'jkl', NULL),
       ('Big missile', 'nuclear_codes', 'Quiz', FALSE, 'I need to pass or else our missiles will go off', '2024-03-01', '1999-12-31', 'mno', 1);

INSERT INTO QuizQuestionDifficulty (type, icon)
VALUES ('easy', 'https://t.ly/2ir2uq r2a1s'),
       ('medium', 'https://t.ly/2r2a1s'),
       ('hard', 'https://t.ly/2ir2ukqq r2a1s'),
       ('very hard', 'https://t.ly/2921q r2a1s'),
       ('impossible', 'https://t.ly/2ir1s');
       
INSERT INTO OwnsQuizQuestion (id, studyMatTitle, topicId, type, question, answer, points)
VALUES ('12', '7_timestables', 'times_tables', 'easy', '1', '7', 0.1),
       ('13', '7_timestables', 'times_tables', 'medium', '4', '28', 0.1),
       ('14', '7_timestables', 'times_tables', 'hard', '7', '49', 0.1),
       ('15', 'Big missile', 'nuclear_codes', 'impossible', 'Neo-Armstrong Missile', '81husv17qUI1#H21', 0.5),
       ('16', 'Big missile', 'nuclear_codes', 'impossible', 'doom', 'ALwqkngNW(!&%*(@32', 0.5);

INSERT INTO OwnsCard (id, studyMatTitle, topicId, question, answer, image)
VALUES ('12', 'waterTypes', 'gen6pokemon', 'emo ninja', 'Greninja', 'https://t.ly/2ir2uqr2a'),
       ('13', 'waterTypes', 'gen6pokemon', 'gun for arm', 'Clawitzer', 'https://t.ly/2ir2uqqkw r2a'),
       ('14', 'steelTypes', 'gen6pokemon', 'double swords', 'Doublade', 'https://t.ly/2ir2uq819j'),
       ('15', 'steelTypes', 'gen6pokemon', 'keys', 'Klefki', 'https://t.ly/q r2a'),
       ('16','Quantum Computing Quadruple Integral Wave … idk some other bs', 'Calculus 9', 'Riemann Hypothesis?', 'true', 'https://t.ly/2ir2u91hjjq r2a');

INSERT INTO `Group` (code, name)
VALUES ('1', 'cool_kidz'),
       ('2', 'even_cooler_kidzz'),
       ('3', 'pokemon fans'),
       ('4', 'UBC CS'),
       ('5', 'DO NOT JOIN');

INSERT INTO Joins (username, groupCode)
VALUES ('i_am_a_beginner', '1'),
       ('smug_person', '1'),
       ('smug_person', '2'),
       ('smug_person', '5'),
       ('ditto07', '3');
       
INSERT INTO Shares (studyMaterialTitle, topicId, groupCode)
VALUES ('7_timestables', 'times_tables', '1'),
       ('waterTypes', 'gen6pokemon', '3'),
       ('steelTypes', 'gen6pokemon', '3'),
       ('Quantum Computing Quadruple Integral Wave … idk some other bs', 'Calculus 9', '1'),
       ('Quantum Computing Quadruple Integral Wave … idk some other bs', 'Calculus 9', '3');

INSERT INTO Likes (studyMaterialTitle, topicId, username)
VALUES ('Quantum Computing Quadruple Integral Wave … idk some other bs', 'Calculus 9', 'i_am_a_beginner'),
       ('waterTypes', 'gen6pokemon', 'ditto07'),
       ('steelTypes', 'gen6pokemon', 'ditto07'),
       ('Quantum Computing Quadruple Integral Wave … idk some other bs', 'Calculus 9', 'smug_person'),
       ('Quantum Computing Quadruple Integral Wave … idk some other bs', 'Calculus 9', 'admin2');