// import express from 'express';
// import { createQuiz, getAllQuizzes } from '../../controllers/quizController.js';

// const router = express.Router();

// // Admin adds a quiz
// router.post('/add', createQuiz);

// // Get all quizzes (for frontend user)
// router.get('/all', getAllQuizzes);

// export default router;


const express = require('express');
const { createQuiz, getAllQuizzes } = require('../../controllers/quizController');

const router = express.Router();

// Admin adds a quiz
router.post('/add', createQuiz);

// Get all quizzes (for frontend user)
router.get('/all', getAllQuizzes);

module.exports = router;

