var express = require('express');
var router = express.Router();
var PlayerModel = require('../models/players')
var GameModel = require('../models/games')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//ROUTE DEFINITION DU NOM DE PARTIE
router.post('/name-game', async function (req, res, next) {
  console.log(req.body.gameName)
  let result = false;
  let newGame = new GameModel({
    gameName: req.body.gameName
  })
  var gameSaved = await newGame.save();
  if (gameSaved.gameName) {
    var playerToUpdate = await PlayerModel.updateMany({}, { game: gameSaved.id })
    if (playerToUpdate.modifiedCount > 0) {
      result = true
    }
  }

  res.json({ result: result, gameName: gameSaved.gameName })
});

//ROUTE UPDATE GRID 
router.post('/update-grid', async function (req, res, next) {
  let result = false

  req.body.map(async item => {
    playerExists = await PlayerModel.findOne({ player: item.player })
    if (playerExists) {
      var playerToUpdate = await PlayerModel.updateOne({ player: item.player }, { score: item.score })
      if (playerToUpdate.modifiedCount === 1) {
        result = true
      }
    } else {
      let newPlayer = new PlayerModel({
        player: parseInt(item.player),
        score: item.score
      })

      var playerSaved = await newPlayer.save()
      if (playerSaved.player) {
        result = true
      }
    }
  })

  res.json({ result: result })
});

//ROUTE RECUPERATION DE LA GRILLE
router.get('/get-grid', async function (req, res, next) {
  let result = false;
  let grid = await PlayerModel.find().populate('game')

  if (grid.length > 0) {
    if (grid[0].game) {
      var gameName = grid[0].game.gameName
      result = true
    } else {
      gameName = "Unnamed game"
      result = true
    }
  }

  res.json({ result: result, gameName: gameName, grid: grid })
});


module.exports = router;
