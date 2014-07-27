// Writen By Mr.Lu

/**
 * Comment Routes
 */

var Comment = require("../proxy/comment");
var Blog = require("../proxy/blog");

exports.addComment = function(req, res) {
	var commentInfo = req.body;
	commentInfo["ip"] = req.connection.remoteAddress;
	Comment.saveNewComment(commentInfo, function(err) {
		if(err) {
			console.error("Add Comment Error: ", err);
			req.flash("error", err);
			return;
		}
		Blog.addCommentCount(commentInfo.articleId, function(err) {
			console.log(err);
			if(err) {
				console.error("Add Comment Error: ", err);
				req.flash("error", err);
				return;
			}
			req.flash("success", "评论成功");
			res.redirect("/blog/show/" + commentInfo.articleId);
		});
	});
};