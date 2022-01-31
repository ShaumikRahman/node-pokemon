const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

function randy(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

app.get("/", async (req, res) => {
  res.setHeader("Content-type", "text/html");

  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${randy(1,898)}/`).then(
    (res) => res.json()
  );
  console.log(result.sprites.other["official-artwork"].front_default);

  res.send(
    `<img src="${result.sprites.other["official-artwork"].front_default}"></img>`
  );
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Listening on port ${PORT}`);
  }
});
