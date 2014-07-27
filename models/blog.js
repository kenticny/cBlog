// Writen by Mr.Lu

/**
 * Blog Model
 */

var mongodb = require("./mongodb"),
	Schema = mongodb.mongoose.Schema,
	ObjectId = Schema.ObjectId;

var blogSchema = new Schema({
	title: {type: String },
	content: {type: String },
	author: {type: ObjectId, ref: "User" },
	tags: [{type: ObjectId, ref: "Tag" }],
  commentCount: {type: Number, default: 0},
	pubTime: {type: Date, default: Date.now },
	lastModifyTime: {type: Date, default: Date.now }
}, {
	collection: "blogs"
});

mongodb.mongoose.model("Blog", blogSchema);

module.exports = mongodb.mongoose.model("Blog");