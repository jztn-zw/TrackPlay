const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

//Route to get all games
router.get("/games", gamesController.getAllGames);
//Route to search a game by id
router.get("/games/:id", gamesController.getGamesById);
//Route to create a new game
router.post("/games", gamesController.createGame);
//Router to delete game
router.put("/games", gamesController.updateGame);
//Route to update game
router.delete("/games", gamesController.deleteGame);
module.exports = router;
