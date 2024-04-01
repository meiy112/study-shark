const achievementLevel = require('./AchievementLevel')
const authRoute = require('./Authentication')
const tag = require('./Tag')
const topic = require('./Topic')
const studyMaterial = require('./StudyMaterial')
const user = require('./User')
const admin = require('./Admin')
const color = require('./Color')

// Expired token for testing purposes: 
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QiLCJpYXQiOjE3MTA3OTM3NDAsImV4cCI6MTcxMTA1Mjk0MH0.ttRDu8UbrUQWrKo_HTIFHqyqj8Q_x6iU0Bk0LBl2Q8A

module.exports = {
  achievementLevel,
  authRoute,
  tag,
  topic, 
  studyMaterial,
  user, 
  admin,
  color,
  // put the rest of your routes here, ex:
  // user,
  // Achievement,
  // etc...
};