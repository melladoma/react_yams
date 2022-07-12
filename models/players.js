var mongoose = require('mongoose')

var PlayerSchema = mongoose.Schema({
    player: Number,
    score: [{ type: Number }]
})

var PlayerModel = mongoose.model('players', PlayerSchema)

module.exports = PlayerModel;