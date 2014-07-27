// Writen by Mr.Lu

/**
 * Blog Data Proxy
 */

var User = require("../models/user");
var Blog = require("../models/blog");
var Tag = require("../models/tag");

/**
 * 保存一篇新博文
 * @param  {object}   blogInfo  博文信息
 * @param  {Function} callback(err)  回调函数
 */
exports.saveNewBlog = function(blogInfo, callback) {
	var blog = new Blog(blogInfo);
	blog.save(callback);
};

/**
 * 根据作者查找所有博文
 * @param  {ObjectId}   author  作者名
 * @param  {Function} callback(err, docs)
 */
exports.getBlogByAuthor = function(author, callback) {
	User.findOne({username: author}, function(err, user) {
		if(err) {
			return callback(err);
		}
		Blog.find({author: user._id})
			.populate([{path: "tags", select: "name"}, "author"])
			.exec(callback);
	});
};

/**
 * 获取所有文字
 * @param  {Function} callback(err, docs)
 */
exports.getBlogList = function(callback) {
	Blog.find().sort({_id: -1}).populate(["tags", "author"]).exec(callback);
};

/**
 * 根据文章ID查找
 * @param  {ObjectId}   id       文章ID
 * @param  {Function} callback(err, doc)
 */
exports.getBlogById = function(id, callback) {
	Blog.findOne({_id: id}).populate(["author", "tags"]).exec(callback);
};

/**
 * 修改文章
 * @param {ObjectId} id 文章ID
 * @param  {object}   blogInfo 新文章
 * @param  {Function} callback(err, count, result)
 */
exports.updateBlog = function(id, blogInfo, callback) {
	Blog.update({_id: id}, {"$set": blogInfo}, callback);
};

/**
 * 给文章回复数加1
 * @param {ObjectId}   articleId 文章编号
 * @param {Function} callback(err)
 */
exports.addCommentCount = function(articleId, callback) {
	Blog.update({_id: articleId}, {'$inc': {commentCount: 1}}, callback);
};