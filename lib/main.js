
require.config({
	baseUrl:'lib',
    paths: {
        jquery: 'jquery-1.12.1.min'
    }
});

require(["mbox"], function(mbox) {
    
    var mbox = new mbox({
    	src:['./img/1.jpg','./img/2.jpg','./img/3.jpg'],
    	sizeLimit:[800,600]
    });

});