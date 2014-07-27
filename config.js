module.exports = {
	database: {
		uri: "mongodb://localhost:27017/cBlog",
		host: "localhost",
		port: 27017,
		username: "",
		password: "",
		dbname: "cBlog"
	},
	session: {
		cookieSecret: "test",
		collection: "sessions"
	}
	
}