var mongoose = require('mongoose')

var PlayerSchema = mongoose.Schema({
    player: Number,
    score: [{ type: Number }],
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'games' }
})

var PlayerModel = mongoose.model('players', PlayerSchema)

module.exports = PlayerModel;