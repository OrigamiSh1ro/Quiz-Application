const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


let questions = [

  // question 1

  { 
    question: " How many trees are there in the forest of Pando?",
    choice1: "44+",
    choice2: "1",
    choice3: "1200+",
    choice4: "1,000,000+",
    answer: 2
  },

  //question 2

  { 
    question: " what is the heaviest living organism in the world? wet",
    choice1: " Blue Whale",
    choice2:  " Hippopotamus",
    choice3: "Honey Mushroom ",
    choice4: "Pando",
    answer: 3
  },

  //question 3

  { 
    question: "How many bones were there in the human body?",
    choice1: "300",
    choice2: "206",
    choice3: "245",
    choice4: "188",
    answer: 1
  },

  //question 4

  { 
    question: "Which is Heavier 1 kilogram of feather or 1 kilogram of steel?",
    choice1: "1 kilogram of feather",
    choice2: "1 kilogram of steel",
    choice3: " neither",
    choice4: "both",
    answer:    3
  },

  //question 5

  { 
    question: " what do you call a place of christian worship?",
    choice1: "Shrine",
    choice2: "Temple",
    choice3: "Everywhere",
    choice4: "Tolot",
    answer: 4
  },

  //question 6

  { 
    question: "What was used to make an Atomic bomb?",
    choice1: "e=mc^2",
    choice2: "ax+b=c",
    choice3: "2(pi)R",
    choice4: "a relationship",
    answer: 1
  },

  //question 7

  { 
    question: " How many Islands are there in the Philippines?",
    choice1: "5,932",
    choice2: "6,239",
    choice3: "7,107",
    choice4: "7,641",
    answer: 4
  },

  //question 8

  { 
    question: "Is Kim Dokja part of a yaoi?",
    choice1: " Yes",
    choice2: "No",
    choice3: "I wished",
    choice4: "I don't know who that is",
    answer: 2
  },

  //question 9

  { 
    question: "Who invented the Tesla car?",
    choice1: " Nikolas Tesla",
    choice2: "Thomas Edison",
    choice3: "Liu Zigang",
    choice4: "Elon Musk",
    answer: 4
  },
  
   { 
    question: " Are you gay?",
    choice1: " Yes, I'm gay",
    choice2:  "No, I'm gay",
    choice3: "Maybe, I'm  gay",
    choice4: "Maybe not, I'm gay",
    answer: 1, 2, 3, 4
  }


];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};
// new questions 
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};


// selection and checking 


choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});


//score count 

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();

