import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatOperator } from '../utils/gameUtils';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, score } = location.state || { questions: [], score: 0 };
  
  if (!questions.length) {
    navigate('/');
    return null;
  }
  
  const handleBackToHome = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Game Results</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Your Score</h2>
              <div className="text-5xl font-bold mt-2">
                {score} / {questions.length}
              </div>
              <div className="mt-2 text-gray-600">
                {score === questions.length ? 'Perfect score! Great job!' : 
                 score >= questions.length * 0.7 ? 'Good job!' : 
                 score >= questions.length * 0.5 ? 'Nice try!' : 
                 'Keep practicing!'}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Question Details</h3>
              
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg ${
                      question.isCorrect ? 'bg-green-100' : 
                      question.timedOut ? 'bg-yellow-100' : 'bg-red-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Q{index + 1}:</span>
                        <span>{question.firstNumber}</span>
                        <span>{formatOperator(question.operator)}</span>
                        <span>{question.secondNumber}</span>
                        <span>=</span>
                        <span className="font-bold">{question.correctAnswer}</span>
                      </div>
                      <div>
                        {question.timedOut ? (
                          <span className="text-yellow-600 font-medium">Time Out</span>
                        ) : question.isCorrect ? (
                          <span className="text-green-600 font-medium">Correct</span>
                        ) : (
                          <span className="text-red-600 font-medium">Incorrect</span>
                        )}
                      </div>
                    </div>
                    
                    {!question.timedOut && (
                      <div className="mt-2 text-gray-600">
                        Your answer: <span className={question.isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          {question.userAnswer}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <button
                onClick={handleBackToHome}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;