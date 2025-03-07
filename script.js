// //your JS code here.
// let questions= document.getElementById("questions");


// // Do not change code below this line
// // This code will just display the questions to the screen
// const questions = [
//   {
//     question: "What is the capital of France?",
//     choices: ["Paris", "London", "Berlin", "Madrid"],
//     answer: "Paris",
//   },
//   {
//     question: "What is the highest mountain in the world?",
//     choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
//     answer: "Everest",
//   },
//   {
//     question: "What is the largest country by area?",
//     choices: ["Russia", "China", "Canada", "United States"],
//     answer: "Russia",
//   },
//   {
//     question: "Which is the largest planet in our solar system?",
//     choices: ["Earth", "Jupiter", "Mars"],
//     answer: "Jupiter",
//   },
//   {
//     question: "What is the capital of Canada?",
//     choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
//     answer: "Ottawa",
//   },
// ];

// // Display the quiz questions and choices
// function renderQuestions() {
//   for (let i = 0; i < questions.length; i++) {
//     const question = questions[i];
//     const questionElement = document.createElement("div");
//     const questionText = document.createTextNode(question.question);
//     questionElement.appendChild(questionText);
//     for (let j = 0; j < question.choices.length; j++) {
//       const choice = question.choices[j];
//       const choiceElement = document.createElement("input");
//       choiceElement.setAttribute("type", "radio");
//       choiceElement.setAttribute("name", `question-${i}`);
//       choiceElement.setAttribute("value", choice);
//       if (userAnswers[i] === choice) {
//         choiceElement.setAttribute("checked", true);
//       }
//       const choiceText = document.createTextNode(choice);
//       questionElement.appendChild(choiceElement);
//       questionElement.appendChild(choiceText);
//     }
//     questionsElement.appendChild(questionElement);
//   }
// }
// renderQuestions();

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Venus"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

// Load saved progress from session storage
function loadProgress() {
  const savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  return savedProgress;
}

// Save selected answers to session storage
function saveProgress(questionIndex, answer) {
  const progress = loadProgress();
  progress[questionIndex] = answer;
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Render questions
function renderQuestions() {
  const savedProgress = loadProgress();
  
  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<p>${question.question}</p>`;
    
    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${index}`);
      choiceElement.setAttribute("value", choice);
      if (savedProgress[index] === choice) {
        choiceElement.checked = true;
      }
      
      choiceElement.addEventListener("change", () => {
        saveProgress(index, choice);
      });
      
      const label = document.createElement("label");
      label.textContent = choice;
      
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(label);
    });
    
    questionsContainer.appendChild(questionElement);
  });
}

// Calculate and display the score
submitButton.addEventListener("click", () => {
  const savedProgress = loadProgress();
  let score = 0;
  
  questions.forEach((question, index) => {
    if (savedProgress[index] === question.answer) {
      score++;
    }
  });
  
  scoreDisplay.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

// Load last score from local storage
window.onload = () => {
  renderQuestions();
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDisplay.textContent = `Your score is ${savedScore} out of 5.`;
  }
};

