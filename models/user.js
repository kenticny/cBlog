// Writen by Mr.Lu

/**
 * User Model
 */

var mongodb = require("./mongodb"),
	Schema = mongodb.mongoose.Schema;

var userSchema = new Schema({
	username: {type: String },
	password: {type: String },
	email: {type: String },
  github: {type: String },
  displayName: {type: String },
  intro: {type: String },
  photo: {type: String},
  type: {type: String}
}, {
	collection: "users"
});

mongodb.mongoose.model("User", userSchema);

module.exports = mongodb.mongoose.model("User");