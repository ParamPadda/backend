const Quiz = require("../models/quiz");

 const createQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    await newQuiz.save();
    res.status(201).json({ success: true, quiz: newQuiz });
  } catch (error) {
    
 console.error("Error creating quiz:", error); // ✅ log error to terminal
    res.status(500).json({ success: false, message: 'Failed to create quiz' });
  }
};
 const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch quizzes' });
  }
};
module.exports={getAllQuizzes, createQuiz};