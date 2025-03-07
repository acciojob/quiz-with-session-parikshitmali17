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
  { question: "What is the capital of France?", choices: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { question: "What is the highest mountain in the world?", choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"], answer: "Everest" },
  { question: "What is the largest country by area?", choices: ["Russia", "China", "Canada", "United States"], answer: "Russia" },
  { question: "Which is the largest planet in our solar system?", choices: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "Jupiter" },
  { question: "What is the capital of Canada?", choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"], answer: "Ottawa" }
];

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load previous answers from sessionStorage
const loadAnswers = () => {
  return JSON.parse(sessionStorage.getItem("progress")) || {};
};

const saveAnswers = (answers) => {
  sessionStorage.setItem("progress", JSON.stringify(answers));
};

const renderQuestions = () => {
  const savedAnswers = loadAnswers();
  questionsElement.innerHTML = "";

  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<p>${q.question}</p>`;

    q.choices.forEach(choice => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;
      if (savedAnswers[i] === choice) {
        input.checked = true;
      }
      input.addEventListener("change", () => {
        const answers = loadAnswers();
        answers[i] = choice;
        saveAnswers(answers);
      });
      
      questionDiv.appendChild(input);
      questionDiv.appendChild(document.createTextNode(choice));
    });

    questionsElement.appendChild(questionDiv);
  });
};

submitButton.addEventListener("click", () => {
  const savedAnswers = loadAnswers();
  let score = 0;

  questions.forEach((q, i) => {
    if (savedAnswers[i] === q.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

// Load previous score from localStorage
const previousScore = localStorage.getItem("score");
if (previousScore !== null) {
  scoreElement.textContent = `Your score is ${previousScore} out of 5.`;
}

renderQuestions();

