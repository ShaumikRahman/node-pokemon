const pokemonContainer = document.getElementById("pokemonContainer");
const inputPokemon = document.getElementById("input");
const scoreElement = document.getElementById("score");
const answerContainer = document.getElementById("answerContainer");


let currentPokemon = "";
let score = 0;
let newGame = false;


window.onload = async (e) => {
  getRandomPokemon();
};

window.onkeyup = (e) => {
  if (e.key === "Enter") {
    submitPokemon();
  }
};

function getRandomPokemon() {
  fetch("/pokemon", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => setPokemon(data));
}

function setPokemon(data) {
  if (pokemonContainer.children[0]) {
    pokemonContainer.children[0].setAttribute("src", data.randomPokemon);
  } else {
    const pokemonImgElement = document.createElement("img");
    pokemonImgElement.classList.add("main__pokemon");
    pokemonImgElement.setAttribute("src", data.randomPokemon),
      pokemonContainer.appendChild(pokemonImgElement);
  }

  currentPokemon = data.name;
}

function submitPokemon() {
  window.scrollTo(0, 38);
  removeAnswer();
  if (inputPokemon.value) {
    validateString(inputPokemon.value) === currentPokemon ? handleCorrectSubmission() : handleIncorrectSubmission();
    inputPokemon.value = "";
    getRandomPokemon();
  } else {
      emptySubmission();
  }
}

function validateString(name) {
  return(name.slice(0,1).toLowerCase() + name.slice(1,name.length));
}

function emptySubmission() {
  endScore();
  getRandomPokemon();
}

function handleCorrectSubmission() {

  if (newGame) {
    newGame = false;
    score = 0;
  }

  // correct trigger
  score++;
  showScore();

}

function handleIncorrectSubmission() {
  endGame();
  endScore();
}

function removeAnswer() {
  answerContainer.classList.remove('show');
}

function endGame() {
  answerContainer.children[0].textContent = `Answer was ${currentPokemon}`;
  answerContainer.classList.add('show');
}

function showScore() {
  scoreElement.classList.remove('end');
  scoreElement.classList.add('playing');

  scoreElement.textContent = `Score: ${score}`
}

function endScore() {
  scoreElement.classList.remove('playing');
  scoreElement.classList.add('end');

  scoreElement.textContent = `Final score: ${score}`
  newGame = true;
}
