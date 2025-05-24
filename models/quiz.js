// models/QuizQuestion.js
const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswerIndex: Number,
});

module.exports = mongoose.model('QuizQuestion', quizSchema);
