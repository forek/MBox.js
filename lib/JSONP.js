//         JSONP
//version:1.0

(function (window,factory) {
  typeof define === "function" && define.amd ? define(factory) : window.JSONP = factory();
})(window,function(){
  var jsonp = function (url,cfg){
    if (url && cfg.callback) {
      var el     = document.createElement("script"),
          data   = '?',
          Rand   = Math.round(Math.random()*1000),
          cb     = 'jsoncallback=jsonpCallBack_' + Rand ;

      window['jsonpCallBack_' + Rand] = cfg.callback;

      if( cfg.data && typeof cfg.data == 'object' ){
      	for (var key in cfg.data) {
          data += (key + '=' + cfg.data[key] + '&');
        }
      }

      el.type = "text/javascript";
      el.src  = url + data + cb;
      document.getElementsByTagName("head")[0].appendChild(el);  
    }
  };

  return jsonp;

})

