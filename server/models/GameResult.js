const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  firstNumber: {
    type: Number,
    required: true
  },
  operator: {
    type: String,
    required: true,
    enum: ['+', '-', '*', '/']
  },
  secondNumber: {
    type: Number,
    required: true
  },
  correctAnswer: {
    type: Number,
    required: true
  },
  userAnswer: {
    type: Number
  },
  isCorrect: {
    type: Boolean
  },
  timedOut: {
    type: Boolean,
    default: false
  }
});

const GameResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [QuestionSchema],
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true,
    default: 10
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GameResult', GameResultSchema);