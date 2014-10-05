exports.settingPage = function(req, res) {
  res.render("setting/settings", {
    title: "系统设置",
    user: req.session.user
  });
};