const pokemonContainer = document.getElementById('pokemonContainer');

window.onload = async e => {
    // fetch('/pokemon', {method: 'POST', headers: {
    //     'Content-type': 'text/plain'
    // }})
    // .then(res => res.json())
    // .then(pokemonImg => console.log(pokemonImg));

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
        // pokemonImgElement.classList.add('test'); eventual scss bem class
        pokemonImgElement.setAttribute('src', newPokemon),
        pokemonContainer.appendChild(pokemonImgElement);
    }

}