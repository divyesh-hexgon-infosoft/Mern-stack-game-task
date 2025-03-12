// Generate a random number between min and max (inclusive)
export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  export const getRandomOperator = () => {
    const operators = ['+', '-', '*', '/'];
    return operators[Math.floor(Math.random() * operators.length)];
  };
  
  export const calculateResult = (num1, operator, num2) => {
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        // Ensure division results in an integer
        return num1 / num2;
      default:
        return 0;
    }
  };
  
  export const generateUniqueEquation = (usedEquations) => {
    let num1, num2, operator, result;
    let equationKey;
    
    do {
      num1 = getRandomNumber(0, 9);
      num2 = getRandomNumber(0, 9);
      operator = getRandomOperator();
      
      if (operator === '/') {
        if (num1 === 0) {
          num1 = getRandomNumber(1, 9);
        }
        
        const factors = [];
        for (let i = 1; i <= num1; i++) {
          if (num1 % i === 0) {
            factors.push(i);
          }
        }
        
        num2 = factors[Math.floor(Math.random() * factors.length)];
      }
      
      result = calculateResult(num1, operator, num2);
      equationKey = `${num1}${operator}${num2}`;
    } while (usedEquations.has(equationKey));
    
    return {
      firstNumber: num1,
      operator,
      secondNumber: num2,
      correctAnswer: result,
      key: equationKey
    };
  };
  
  export const generateAnswers = (correctAnswer) => {
    const answers = [correctAnswer];
    
    while (answers.length < 4) {
      let wrongAnswer;
      if (correctAnswer === 0) {
        wrongAnswer = getRandomNumber(1, 20);
      } else {
        const min = Math.max(0, correctAnswer - 10);
        const max = correctAnswer + 10;
        wrongAnswer = getRandomNumber(min, max);
        
        if (wrongAnswer === correctAnswer) {
          wrongAnswer = wrongAnswer + 1;
        }
      }
      
      if (!answers.includes(wrongAnswer)) {
        answers.push(wrongAnswer);
      }
    }
    
    return answers.sort(() => Math.random() - 0.5);
  };
  
  export const formatOperator = (operator) => {
    switch (operator) {
      case '+':
        return '+';
      case '-':
        return '-';
      case '*':
        return '×';
      case '/':
        return '÷';
      default:
        return operator;
    }
  };