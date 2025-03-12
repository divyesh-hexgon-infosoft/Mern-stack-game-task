import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  generateUniqueEquation, 
  generateAnswers, 
  formatOperator 
} from '../utils/gameUtils';
import { saveGameResult } from '../services/api';

const Game = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameData, setGameData] = useState({
    questions: [],
    currentEquation: null,
    answers: [],
    usedEquations: new Set(),
    gameOver: false
  });
  
  const generateQuestion = useCallback(() => {
    const equation = generateUniqueEquation(gameData.usedEquations);
    const answers = generateAnswers(equation.correctAnswer);
    
    setGameData(prevData => ({
      ...prevData,
      currentEquation: equation,
      answers,
      usedEquations: new Set([...prevData.usedEquations, equation.key])
    }));

    setTimeLeft(30);
  }, []);
  
  // Initialize the game
  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);
  
  // Timer countdown
  useEffect(() => {
    if (gameData.gameOver) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestion, gameData.gameOver]);
  
  // Handle timeout
  const handleTimeout = () => {
    if (gameData.gameOver) return;
    
    const { currentEquation } = gameData;
    
    // Add the current question to the questions array
    setGameData(prevData => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        {
          ...currentEquation,
          userAnswer: null,
          isCorrect: false,
          timedOut: true
        }
      ]
    }));
    
    if (currentQuestion < 9) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      generateQuestion();
    } else {
      endGame();
    }
  };
  
  const handleAnswerSelect = (answer) => {
    if (gameData.gameOver) return;
    
    const { currentEquation } = gameData;
    const isCorrect = answer === currentEquation.correctAnswer;
    
    setGameData(prevData => ({
      ...prevData,
      questions: [
        ...prevData.questions,
        {
          ...currentEquation,
          userAnswer: answer,
          isCorrect,
          timedOut: false
        }
      ]
    }));
    
    if (currentQuestion < 9) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      generateQuestion();
    } else {
      endGame();
    }
  };
  
  const endGame = async () => {
    setGameData(prevData => ({
      ...prevData,
      gameOver: true
    }));
    
    const score = gameData.questions.filter(q => q.isCorrect).length + 
                 (gameData.currentEquation ? 0 : 1);
    
    try {
      const result = await saveGameResult({
        questions: gameData.questions,
        score
      });
      
      if (result.success) {
        navigate('/results', { 
          state: { 
            questions: gameData.questions,
            score 
          } 
        });
      } else {
        toast.error('Failed to save game results');
        navigate('/');
      }
    } catch (error) {
      toast.error('An error occurred');
      navigate('/');
    }
  };
  
  if (!gameData.currentEquation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl font-bold text-gray-700">Loading...</div>
      </div>
    );
  }
  
  const { firstNumber, operator, secondNumber } = gameData.currentEquation;
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Math Game</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="text-lg font-medium text-gray-900">
                Question {currentQuestion + 1} of 10
              </div>
              <div className="text-lg font-medium text-gray-900">
                Time Left: <span className={timeLeft <= 10 ? 'text-red-600' : ''}>{timeLeft}s</span>
              </div>
            </div>
            
            <div className="flex justify-center items-center space-x-4 text-4xl font-bold mb-8">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-lg">
                {firstNumber}
              </div>
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-lg">
                {formatOperator(operator)}
              </div>
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-lg">
                {secondNumber}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {gameData.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(answer)}
                  className="py-4 px-6 bg-gray-200 hover:bg-gray-300 rounded-lg text-xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Game;