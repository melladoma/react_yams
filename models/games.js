var mongoose = require('mongoose')

var GameSchema = mongoose.Schema({
    gameName: String,
})

var GameModel = mongoose.model('games', GameSchema)

module.exports = GameModel;