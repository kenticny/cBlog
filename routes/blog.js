// Writen By Mr.Lu

/*
 * Blog Routes
 */
var markdown = require("markdown").markdown;
var User = require("../proxy/user");
var Blog = require("../proxy/blog");
var Comment = require("../proxy/comment");
var Tag = require("../proxy/tag");

/**
 * 主页 列表页
 * @param  {[type]} req
 * @param  {[type]} res
 * @return {[type]}
 */
exports.homePage = function(req, res) {
  User.getMainUser(function(err, user) {
    if(err) {
      console.error("Get Main User Error:", err);
      req.flash("error", err);
      return;
    }
    if(!user) {
      res.redirect("/user/register");
      return;
    }
    user.intro = markdown.toHTML(user.intro || "");
    Blog.getBlogList(function(err, docs) {
      if(err) {
        req.flash("error", err);
        console.error("Get Blog List Error: ", err);
        return;
      }
      docs.forEach(function(doc) {
        doc.content = markdown.toHTML(doc.content);
      });
      res.render("home", {
        title: "主页",
        user: req.session.user,
        list: docs,
        infoUser: user
      });
    });
  });
};

/**
 * 显示文章内容
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.showBlog = function(req, res) {
  var id = req.params.id;
  Blog.getBlogById(id, function(err, doc) {
    if(err) {
      req.flash("error", err);
      console.error("Show Blog Error: ", err);
      return;
    }
    if(!doc) {
      req.flash("error", "改文章已不存在");
      res.redirect("/home");
      return;
    }
    doc.content = markdown.toHTML(doc.content);
    Comment.getCommentList(id, function(err, comments) {
      comments.forEach(function(n) {
        n.ip = n.ip.replace(/(\d+\.\d+\.)\d+\.\d+/g, "$1*.*");
        n.content = markdown.toHTML(n.content);
      });
      res.render("blog/show", {
        title: doc.title,
        article: doc,
        comments: comments,
        user: req.session.user,
        success: req.flash("success"),
        error: req.flash("error")
      });
    });
  });
};

/**
 * 新建文章页面
 * @param  {[type]} req
 * @param  {[type]} res
 * @return {[type]}
 */
exports.newBlogPage = function(req, res) {
  res.render("blog/create", {
    title: "新文章",
    user: req.session.user
  });
};


/**
 * 新建文章操作
 * @param  {[type]} req
 * @param  {[type]} res
 * @return {[type]}
 */
exports.newBlog = function(req, res) {
  var bloginfo = req.body;
  bloginfo.author = req.session.user._id;
  Tag.saveOrModifyTags(bloginfo.tags.split(","), function(err) {
  	if(err) {
  		console.error("Save Or Inc Tag Error: ", err);
  		req.flash("error", err);
  		return;
  	}
  	Tag.getTagsByNameArray(bloginfo.tags.split(","), function(err, docs) {
      bloginfo.tags = docs.map(function(n) {
        return n._id;
      });
      Blog.saveNewBlog(bloginfo, function(err) {
        if(err) {
          req.flash("error", err);
          console.error("Create Blog Article Error: ", err);
          return;
        }
        req.flash("success", "发布成功");
        res.redirect("/home");
      });
    });
  });
};

/**
 * 修改文章页面
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.modifyBlogPage = function(req, res) {
  var id = req.params.id;
  Blog.getBlogById(id, function(err, doc) {
    if(err) {
      req.flash("error", err);
      console.error("Find Blog Error: ", err);
      return;
    }
    if(!doc) {
      req.flash("error", "该文章不存在");
      res.redirect("/home");
      return;
    }
    res.render("blog/modify", {
      title: doc.title + " - 修改",
      user: req.session.user,
      article: doc,
      success: req.flash("success"),
      error: req.flash("error")
    });
  });
};

/**
 * 修改文章操作
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.modifyBlog = function(req, res) {
  var id = req.params.id;
  var updateInfo = req.body;
  updateInfo["lastModifyTime"] = new Date();
  Tag.saveOrModifyTags(updateInfo.tags.split(","), function(err) {
    if(err) {
      console.error("Save Or Inc Tag Error: ", err);
      req.flash("error", err);
      return;
    }
    Tag.getTagsByNameArray(updateInfo.tags.split(","), function(err, docs) {
      updateInfo.tags = docs.map(function(n) {
        return n._id;
      });
      Blog.updateBlog(id, updateInfo, function(err, count, result) {
        if(err) {
          req.flash("error", err);
          console.error("Modify Blog Error: ", err);
          return; 
        }
        if(count != 1) {
          req.flash("error", "保存修改异常");
          req.redirect("/blog/modify/" + id);
          return;
        } 
        req.flash("success", "修改成功");
        res.redirect("/blog/show/" + id);
      });
    });
  });

};