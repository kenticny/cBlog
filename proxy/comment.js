// Writen By Mr.Lu

/**
 * Comment Data Proxy
 */

var Comment = require("../models/comment");

/**
 * 保存新评论
 * @param  {Object}   commentInfo 评论信息
 * @param  {Function} callback(err)
 */
exports.saveNewComment = function(commentInfo, callback) {
	var comment = new Comment(commentInfo);
	comment.save(callback);
};

/**
 * 查询指定文章的所有回复评论
 * @param  {ObjectId}   articleId 文章ID
 * @param  {Function} callback(err, docs)
 */
exports.getCommentList = function(articleId, callback) {
	Comment.find({articleId: articleId}, callback);
};