# Project Summary
Our project allows users to create and keep track of their own topics, notes, quizzes, and flashcards to help them study. They can also share their study material with other users, search for other user’s study material, and join study groups. Users can also search for and use other user’s shared study notes.

## Demo

https://github.com/meiy112/study-shark/assets/112028455/d4dad6af-6783-4bfb-8898-480864031ebc



## Features
- **Create and Manage Topics:** Users can create their own topics to organize their study material. Each topic can have a title, description, and privacy settings.

- **Create and Share Study Material:** Within each topic, users can create various types of study material including notes, quizzes, and flashcards. They can share these materials with other users or groups.

- **Search and Discover Study Material:** Users can search for study material created by other users. They can explore different topics and study materials shared within the community.

- **Join Study Groups:** Users can join study groups to collaborate with others who are studying similar topics. They can share and discuss study material within these groups.

- **Earn Achievements:** Users can earn achievements based on their study progress. Achievements come in different levels of difficulty and provide users with points and rewards.


## Schema

The database schema consists of the following tables:

- **Achievement:** Represents achievements earned by users.
- **AchievementLevel:** Stores information about different levels of achievements.
- **User:** Contains user information such as username, email, and points.
- **CreatesTopic:** Tracks topics created by users.
- **Tag:** Stores tags associated with topics.
- **Has:** Represents the relationship between tags and topics.
- **ContainsStudyMaterial:** Stores study material within topics.
- **StudyMaterialType:** Defines different types of study materials.
- **OwnsQuizQuestion:** Tracks quiz questions owned by users.
- **QuizQuestionDifficulty:** Defines difficulty levels for quiz questions.
- **OwnsCard:** Tracks flashcards owned by users.
- **Group:** Represents study groups.
- **Joins:** Tracks users joining study groups.
- **Shares:** Tracks sharing of study material between users and groups.
- **Likes:** Represents likes given by users to study material.


## Quote of the Day:
"Better ask 40 dumb questions than make 40 dumb mistakes" - Maggie, 2024 
