export function debounce(handler, delay) {
  //this指向window
  var timer = null;
  return function() {
    //this指向谁调用的它
    var _self = this,
      _arg = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      //this指向window
      handler.apply(_self, _arg); //改变this指向，指向谁调用的它
    }, delay);
  };
}
