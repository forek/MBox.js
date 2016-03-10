
require.config({
	baseUrl:'lib',
    paths: {
        jquery: 'jquery-1.12.1.min'
    }
});

require(["mbox","JSONP"], function(mbox,JSONP) {

    JSONP('http://api.flickr.com/services/feeds/photos_public.gne',{
    	data: {
    		tags:'dog',
    		tagmode:'any',
    		format:'json'
    	},
    	callback: function (result) {
        	if(result.items && result.items.length > 0){
          	  var src = [];
          	  result.items.forEach(function(obj){
          	    src.push(obj.media.m);
              });

              var show = new mbox({
    			      src:src,
    			      sizeLimit:[800,800]
              });  

            }
        }
    });

});

