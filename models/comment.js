// Writen By Mr.Lu

/**
 * Comment Model
 */

var mongodb = require("./mongodb"),
    Schema = mongodb.mongoose.Schema,
    ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
	content: {type: String },
	articleId: {type: ObjectId, ref: "Blog"},
	author: {type: String },
	postTime: {type: Date, default: Date.now },
	ip: {type: String}
}, {
	collection: "comments"
});

mongodb.mongoose.model("Comment", commentSchema);

module.exports = mongodb.mongoose.model("Comment");