// Writen by Mr.Lu

/**
 * Tag Model
 */

var mongodb = require("./mongodb"),
    Schema = mongodb.mongoose.Schema;

var tagSchema = new Schema({
	name: {type: String },
	articleCount: {type: Number, default: 1 }
}, {
	collection: "tags"
});

mongodb.mongoose.model("Tag", tagSchema);

module.exports = mongodb.mongoose.model("Tag");