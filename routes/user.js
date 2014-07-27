// Writen By Mr.Lu

/*
 * User Routes
 */

var User = require("../proxy/user");

/**
 * 登录页面
 * @param  {[type]} req
 * @param  {[type]} res
 * @return {[type]}
 */
exports.loginPage = function(req, res) {
	res.render("login", {
		title: "登录",
		error: req.flash("error")
	});
};

/**
 * 登录操作
 * @param  {[type]} req
 * @param  {[type]} res
 * @return {[type]}
 */
exports.doLogin = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	User.findUserByUsernameAndPassword(username, password, function(err, user) {
		if(err) {
			req.flash("error", err);
			console.error("Login Err: ", err);
			return; 
		}
		if(user) {
			req.session.user = user;
			res.redirect("/home");
			return;
		} else {
			req.flash("error", "用户名或密码错误");
			res.redirect("/user/login");
		}
		
	});
};

/**
 * 注册页面
 * @param  {[type]} req
 * @param  {[type]} res
 * @return {[type]}
 */
exports.registerPage = function(req, res) {
	res.render("user/register", {
		title: "注册",
		error: req.flash("error")
	});
};

/**
 * 注册操作
 * @param  {[type]} req
 * @param  {[type]} res
 * @return {[type]}
 */
exports.doRegister = function(req, res) {
	var userinfo = req.body;

	if(!(userinfo.username && userinfo.password && userinfo.email)) {
		req.flash("error", "请将信息填写完整");
		res.redirect("/user/register");
		return;
	}

	if(userinfo.password !== userinfo.repassword) {
		req.flash("error", "两次输入的密码不相同");
		res.redirect("/user/register");
		return;
	}

	delete userinfo.repassword;

	User.saveMainUser(userinfo, function(err) {
		if(err) {
			req.flash("error", err);
			console.log("Register Error: ", err);
			return;
		}
		req.flash("success", "注册完成");
		res.redirect("/user/login");
	});
};

/**
 * 注销操作
 * @param  {[type]} req
 * @param  {[type]} res
 * @return {[type]}
 */
exports.logout = function(req, res) {
	req.session.user = null;
	res.redirect("/home");
};

/**
 * 个人信息页面
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.userInfoPage = function(req, res) {
	User.findUserByUsername(req.session.user.username, function(err, user) {
		if(err) {
			console.error("Get User Info Error: ", err);
			req.flash("error", err);
			return;
		}
		res.render("user/info", {
			title: "个人信息",
			user: req.session.user,
			infoUser: user
		});
	});
};

exports.saveUserInfo = function(req, res) {
	var info = {
		displayName: req.body.displayName || null,
		github: req.body.github || null,
		intro: req.body.intro || null,
		email: req.body.email || null
	};
	if(req.body.newPassword && req.body.newPassword == req.body.rePassword) {
		info["password"] = req.body.newPassword;
	}
	User.updateUserInfo(req.session.user.username, info, function(err){
		if(err) {
			console.error("Update User Info Error: ", err);
			req.flash("error", err);
			return;
		}
		req.flash("success", "修改成功");
		res.redirect("/home");
	});
};