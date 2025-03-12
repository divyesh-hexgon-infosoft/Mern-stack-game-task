import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleStartGame = () => {
    navigate('/game');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Math Game</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex-shrink-0">
                <img
                  className="h-24 w-24 rounded-full object-cover"
                  src={user?.profilePicture ? `http://localhost:5000${user.profilePicture}` : 'https://via.placeholder.com/150'}
                  alt={`${user?.firstName} ${user?.lastName}`}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{`${user?.firstName} ${user?.lastName}`}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-gray-600">{user?.phoneNumber}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Game Instructions</h3>
              <div className="mt-2 text-gray-600">
                <p>Welcome to the Math Game! Here's how to play:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>You'll be presented with 10 math questions.</li>
                  <li>Each question will show a simple equation with two numbers and an operator.</li>
                  <li>Choose the correct answer from four options.</li>
                  <li>You have 30 seconds to answer each question.</li>
                  <li>Your final score will be displayed at the end.</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleStartGame}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Start Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;