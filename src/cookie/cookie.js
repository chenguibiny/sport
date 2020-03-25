var manageCookie = {
  setCookie: function(name, value, date) {
    document.cookie = name + "=" + value + ";max-age=" + date;
    return this;
  },
  removeCookie: function(name) {
    this.setCookie(name, "", -1);
    return this;
  },
  getCookie: function(name, callback) {
    var allcookie = document.cookie;
    var allcookiearr = allcookie.split("; ");
    for (var i = 0; i < allcookiearr.length; i++) {
      var itemcookie = allcookiearr[i].split("=");
      // console.log(itemcookie);
      if (itemcookie[0] == name) {
        callback(itemcookie[1]);
        return this;
      }
    }
    callback("undefined");
    return this;
  }
};
export default manageCookie;
