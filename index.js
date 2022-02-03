const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

function randy(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

app.post("/pokemon", async (req, res) => {
  console.log('hit');
  res.setHeader("Content-type", "application/json");

  const randomPokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${randy(1, 898)}/`
  ).then((res) => res.json());

  //console.log(randomPokemon);

  res.send({
    randomPokemon: randomPokemon.sprites.other["official-artwork"].front_default,
    name: randomPokemon.species.name
  });
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Listening on port ${PORT}`);
  }
});
