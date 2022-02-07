const pokemonContainer = document.getElementById("pokemonContainer");
const inputPokemon = document.getElementById("input");

let currentPokemon = "";

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
  if (inputPokemon.value) {
    validateString(inputPokemon.value) === currentPokemon ? handleCorrectSubmission() : handleIncorrectSubmission();
    inputPokemon.value = "";
    getRandomPokemon();
  } else {
      invalidSubmission();
  }
}

function validateString(name) {
  return(name.slice(0,1).toLowerCase() + name.slice(1,name.length));
}

function handleCorrectSubmission() {
  console.log('correct');
}

function handleIncorrectSubmission() {
  console.log('incorrect');
}
