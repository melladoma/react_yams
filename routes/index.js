var express = require('express');
var router = express.Router();
var PlayerModel = require('../models/players')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
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
  let grid = await PlayerModel.find()
  if (grid.length > 0) {
    result = true
  }
  console.log(grid)
  res.json({ result: result, grid: grid })
});


module.exports = router;
