var crypto = require("crypto");


module.exports = {


  /**
   * 返回MD5加密字符串
   * @param  {string} str 待加密字符串
   * @return {string}  加密后的字符串
   */
  MD5: function(str) {
    var hash = crypto.createHash("md5");
    return hash.update(str).digest("hex");
  }

}