const express = require("express");
const axios = require("axios");
const app = express();
require("dotenv").config();

const marvelAPIKey = process.env.MARVEL_API_KEY;

app.get("/", (req, res) => {
  res.json({ message: "Home" });
});

// Liste des comics
app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${marvelAPIKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error:
        "Une erreur a eu lieu lors de la récupération de la liste des comics",
    });
  }
});

// Détail d'un comic
app.get("/comic/:comicId", async (req, res) => {
  const comicId = req.params.comicId;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${marvelAPIKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({
      error:
        "Une erreur a eu lieu lors de la récupération lors des détails d'un comic spécifique",
    });
  }
});

// Listes des comics d'un perso
app.get("/comics/:characterId", async (req, res) => {
  const characterId = req.params.characterId;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${marvelAPIKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      error:
        "Une erreur a eu lieu lors de la récupération des comics d'un perso",
    });
  }
});

// Liste de tous les perso
app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${marvelAPIKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({
      error:
        "Une erreur a eu lieu lors de la récupération de la liste des personnages",
    });
  }
});

// Liste des détails d'un perso
app.get("/characters/:characterId", async (req, res) => {
  const characterId = req.params.characterId;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${marvelAPIKey}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching character detail:", error);
    res.status(500).json({
      error:
        "Une erreur a eu lieu lors de la récupération des détails d'un perso",
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});