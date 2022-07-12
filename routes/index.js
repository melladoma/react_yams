var express = require('express');
var router = express.Router();
var PlayerModel = require('../models/players')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/post-grid', async function (req, res, next) {
  let result = false

  // OK pour un seul objet Player...
  // let newPlayer = new PlayerModel({
  //   player: parseInt(req.body.player),
  //   score: req.body.score.split(",")
  // })

  // var playerSaved = await newPlayer.save()
  // if (playerSaved.player) {
  //   result = true
  // }
  res.json({ result: result })
});

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
module.exports = router;
