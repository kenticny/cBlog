// Writen By Mr.Lu

/**
 *  User Data Proxy
 */

var User = require("../models/user");

/**
 * 保存一个新用户
 * @param  {object}   userInfo 用户信息
 * @param  {Function} callback 回调函数
 */
exports.saveMainUser = function(userInfo, callback) {
  User.findOne({type: "main", username: userInfo.username}, function(err, doc) {
    if(err) {
      return callback(err);
    }
    if(!doc) {
      userInfo["type"] = "main";
      userInfo["displayName"] = userInfo.username;
      var user = new User(userInfo);
      user.save(callback);
    }else {
      return callback("管理用户已经存在");
    }
  });
	
};

/**
 * 根据用户名和密码查找用户
 * @param  {string}   username 用户名
 * @param  {string}   password 密码
 * @param  {Function} callback(err, doc) 回调函数
 */
exports.findUserByUsernameAndPassword = function(username, password, callback) {
	User.findOne({username: username, password: password}, callback);
};

/**
 * 获取用户信息
 * @param  {string} username [用户名]
 * @param  {Function} callback(err, doc)
 */
exports.findUserByUsername = function(username, callback) {
  User.findOne({username: username}, callback);
};

/**
 * 更新个人信息
 * @param  {string}   username [用户名]
 * @param  {Object<User>}   info     [更新信息]
 * @param  {Function} callback(err)
 */
exports.updateUserInfo = function(username, info, callback) {
  User.update({username: username}, {"$set": info}, callback);
};

/**
 * 获取管理用户信息
 * @param  {Function} callback(err, doc)
 */
exports.getMainUser = function(callback) {
  User.findOne({type: "main"}, callback);
};