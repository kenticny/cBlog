// Writen By Mr.Lu

/**
 * Tag Data Proxy
 */

var Tag = require("../models/tag");

exports.saveOrModifyTags = function(names, callback) {
  if(!names.join(",")) {
    return callback();
  }
  var toNext = function(func) {
    if(names.length > 0) {
      innerLoop(func);  
    }else {
      func();
    }
  };
  var innerLoop = function(func) {
    var name = names.shift().trim();
    Tag.findOne({name: name}, function(err, doc) {
      if(err) {
        return func(err);
      }
      if(!doc) {
        doc = new Tag({name: name});
        doc.save(function(err) {
          if(err) {
            return func(err);
          }
          toNext(func);
        });
      }else {
        toNext(func);
      }
    });
  }
  innerLoop(callback);
};

exports.getTagByName = function(name, callback) {
  Tag.findOne({name: name}, callback);
};

exports.getTagsByNameArray = function(names, callback) {
  names = names.map(function(n) {
    return n.trim();
  });
  Tag.find({name: {$in: names}}).select("_id").exec(callback);
};