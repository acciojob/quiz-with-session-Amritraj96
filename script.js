// your JS code here.

// Array of quiz questions (already provided)
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
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// --- Load previous selections from session storage ---
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// --- Load previous score from local storage (if exists) ---
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// --- Render quiz questions ---
function renderQuestions() {
  questionsElement.innerHTML = "";
  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");
    const qText = document.createElement("p");
    qText.textContent = q.question;
    questionDiv.appendChild(qText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Restore previously selected answer (if any)
      if (savedProgress[i] === choice) {
        input.checked = true;
      }

      // Save progress to session storage when changed
      input.addEventListener("change", () => {
        savedProgress[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
    });

    questionsElement.appendChild(questionDiv);
  });
}

// --- Handle quiz submission ---
submitButton.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, i) => {
    const selected = savedProgress[i];
    if (selected && selected === q.answer) {
      score++;
    }
  });

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// --- Initial render ---
renderQuestions();

