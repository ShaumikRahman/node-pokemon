const pokemonContainer = document.getElementById('pokemonContainer');
const inputPokemon = document.getElementById('input');

window.onload = async e => {

    fetch('/pokemon', {method: 'POST', headers: {
        'Content-type': 'application/json'
    }})
    .then(res => res.json())
    .then(data => setPokemon(data.randomPokemon));
    
}

function setPokemon(newPokemon) {

    if (pokemonContainer.children.pokemon) {
        pokemonContainer.children.pokemon.textContent = newPokemon;
    } else {
        const pokemonImgElement = document.createElement('img');
        pokemonImgElement.classList.add('main__pokemon');
        pokemonImgElement.setAttribute('src', newPokemon),
        pokemonContainer.appendChild(pokemonImgElement);
    }

}

function submitPokemon() {
    console.log(inputPokemon.value);
}