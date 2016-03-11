//         JSONP

(function (window,factory) {
  typeof define === "function" && define.amd ? define(factory) : window.JSONP = factory();
})(window,function(){
  var jsonp = function (url,cfg){
    if (url && cfg.callback) {
      var el     = document.createElement("script"),
          data   = '?',
          head   = document.getElementsByTagName("head")[0],
          cbFunc = function (result) {
            cfg.callback(result);
            head.removeChild(el);
            jsonp.cbArr.splice(index,1)
          };

      jsonp.cbArr.push(cbFunc);

      var index  = jsonp.cbArr.length - 1,
          cb     = 'jsoncallback=jsonp.cbArr['+index+']';

      if( cfg.data && typeof cfg.data == 'object' ) {
      	for (var key in cfg.data) {
          if (cfg.data.hasOwnProperty(key)) {
            data += (key + '=' + cfg.data[key] + '&');
          }
        }
      }

      el.type = "text/javascript";
      el.src  = url + data + cb;
      head.appendChild(el);
    }
  };

  jsonp.cbArr = [];

  return jsonp;

})

