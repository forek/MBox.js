# MBox.js
一个基于jQuery的图片浏览组件

支持requirejs加载

    require(["mbox","JSONP"], function(mbox,JSONP) {
    	//some code
	});

显示一组图片

	var show = new mbox({
    	src:['url_1','url_2','url_3'], 
    	sizeLimit:[800,800] // 尺寸限制
    });  

# JSONP.js
一个简单的JSONP跨域请求组件

	JSONP(url,{
		data:{
			key:value
		},
		callback:function () {} 
	});
