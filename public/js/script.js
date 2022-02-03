const pokemonContainer = document.getElementById('pokemonContainer');
const inputPokemon = document.getElementById('input');

let currentPokemon = '';

window.onload = async e => {

    getRandomPokemon();
    
}

function getRandomPokemon() {

    fetch('/pokemon', {method: 'POST', headers: {
        'Content-type': 'application/json'
    }})
    .then(res => res.json())
    .then(data => setPokemon(data));
}

function setPokemon(data) {

    if (pokemonContainer.children[0]) {
        pokemonContainer.children[0].setAttribute('src', data.randomPokemon);
    } else {
        const pokemonImgElement = document.createElement('img');
        pokemonImgElement.classList.add('main__pokemon');
        pokemonImgElement.setAttribute('src', data.randomPokemon),
        pokemonContainer.appendChild(pokemonImgElement);
    }

    currentPokemon = data.name;


}

function submitPokemon() {
    console.log(inputPokemon.value, currentPokemon);
    inputPokemon.value = '';
    getRandomPokemon(); 
}