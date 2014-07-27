var mongoose = require("mongoose"),
    config = require("../config");

mongoose.connect(config.database.uri, function(err) {
	if(err) {
		console.error("Mongodb Connect Error: ", err);
		process.exit(-1);
	}
});

exports.mongoose = mongoose;