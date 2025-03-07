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

const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

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
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

function renderQuestions() {
  questionsElement.innerHTML = "";
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionDiv = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionDiv.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = `question-${i}`;
      choiceInput.value = choice;

      // Check if this choice was previously selected
      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
        choiceInput.setAttribute("checked", "true"); // Set attribute for Cypress test
      }

      choiceInput.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
        // Update checked attribute for Cypress test
        document.querySelectorAll(`input[name="question-${i}"]`).forEach((input) => {
          input.removeAttribute("checked");
        });
        choiceInput.setAttribute("checked", "true");
      });

      const choiceLabel = document.createElement("label");
      choiceLabel.appendChild(choiceInput);
      choiceLabel.appendChild(document.createTextNode(` ${choice}`));
      questionDiv.appendChild(choiceLabel);
    }
    questionsElement.appendChild(questionDiv);
  }
}

submitButton.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  const scoreText = `Your score is ${score} out of ${questions.length}.`;
  scoreElement.textContent = scoreText;
  localStorage.setItem("score", score.toString());
});

// Display previous score from local storage
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

renderQuestions();
