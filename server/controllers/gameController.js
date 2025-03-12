const GameResult = require('../models/GameResult');
const User = require('../models/User');

// Save game result
exports.saveGameResult = async (req, res) => {
  try {
    const { questions, score } = req.body;
    
    const gameResult = new GameResult({
      user: req.user.id,
      questions,
      score,
      totalQuestions: questions.length
    });
    
    await gameResult.save();
    
    // Update user's game results
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { gameResults: gameResult._id } }
    );
    
    res.status(201).json(gameResult);
  } catch (error) {
    console.error('Save game result error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's game history
exports.getGameHistory = async (req, res) => {
  try {
    const gameResults = await GameResult.find({ user: req.user.id })
      .sort({ completedAt: -1 });
    
    res.json(gameResults);
  } catch (error) {
    console.error('Get game history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get specific game result
exports.getGameResult = async (req, res) => {
  try {
    const gameResult = await GameResult.findById(req.params.id);
    
    if (!gameResult) {
      return res.status(404).json({ message: 'Game result not found' });
    }
    
    // Check if the game result belongs to the user
    if (gameResult.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(gameResult);
  } catch (error) {
    console.error('Get game result error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
