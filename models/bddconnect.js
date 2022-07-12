var mongoose = require('mongoose')

var user = 'admin';
var password = 'adminpwd';
var port = 55492;
var bddname = 'yams';

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.x1wn2.mongodb.net/${bddname}?retryWrites=true&w=majority`,
    options,
    function (err) {
        console.log(err);
    }
);