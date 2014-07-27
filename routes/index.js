// Writen by Mr.Lu

/**
 * Routes
 */

var User = require("./user");
var Blog = require("./blog");
var Comment = require("./comment");

module.exports = function(app) {

	app.get("/", function(req, res) {
		res.redirect("/home");
	});

	app.get("/user/login", User.loginPage);
	app.post("/user/login", User.doLogin);
	
	app.get("/user/information", User.userInfoPage);
	app.post("/user/information", User.saveUserInfo);

	app.get("/user/logout", User.logout);
	
	app.get("/user/register", User.registerPage);
	app.post("/user/register", User.doRegister);

	app.get("/home", Blog.homePage);

	app.get("/blog/show/:id", Blog.showBlog);

	app.get("/blog/new", checkLogin, Blog.newBlogPage);
	app.post("/blog/new", checkLogin, Blog.newBlog);

	app.get("/blog/modify/:id", checkLogin, Blog.modifyBlogPage);
	app.post("/blog/modify/:id", checkLogin, Blog.modifyBlog);

	app.post("/comment/new", Comment.addComment);

	function checkLogin(req, res, next) {
		if(!req.session.user) {
			return res.redirect("/user/login");
		}
		next();
	}
}