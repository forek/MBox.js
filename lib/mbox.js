//         Mbox
//version:1.0

(function (window,factory) {
  typeof define === "function" && define.amd ? define(['jquery'],factory) : window.mbox = factory();
})(window,function($){
  
  var mbox = function(cfg){

    this.cfg = {
      src:        [],
      sizeLimit:  null,
      className:  'mbox',
      noPicFunc:  null
    };

    var el            = {},
        num           = 0,
        loading       = false,
        that          = this,
        windowHeight  = window.innerHeight,
        windowWidth   = window.innerWidth,
        load = function (src) {
          var result;
          $("<img/>").attr("src",src).load(function() {
          var width,height,w,h;

          if(that.cfg.sizeLimit && (this.width > that.cfg.sizeLimit[0] || this.height > that.cfg.sizeLimit[1])){
            this.width > this.height ?  this.width > windowWidth ? width = that.cfg.sizeLimit[0] : height = that.cfg.sizeLimit[1] : this.height > windowHeight ? height = that.cfg.sizeLimit[1] : width = that.cfg.sizeLimit[0] ;
          }

          if(width||height){
            var cacheH = this.height,
                cacheW = this.width;
            w = width  || this.width*(height/cacheH);
            h = height || this.height*(width/cacheW);
          } else {
            w = this.width;
            h = this.height;
          }

          var realL   = (windowWidth - w) / 2,
              realT   = (windowHeight - h) / 2,
              btnT    = (windowHeight - 123) / 2,
              btnL    = windowWidth/4,
              brandL  = (windowWidth - 150) / 2,
              brandT  = windowHeight*0.75;

          var $mask   = $("<div id='mask' class='" + that.cfg.className + "_mask'></div>"),
              $mimg   = $("<img  id='mimg' class='" + that.cfg.className + "_mimg' style='"+(function(){ if(width){return 'width:' + width +'px;'}else if(height){return 'height:' + height + 'px;'}else{return '';}})()+"top:"+realT+"px;left:"+realL+"px;' src='"+src+"'></img>"),
              $btnL   = $("<img id='btnL' class='" + that.cfg.className + "_btn' style='top:"+ btnT+"px;left:"+btnL+"px;' src='img/lbtn.png'></img>"),
              $btnR   = $("<img id='btnR' class='" + that.cfg.className + "_btn' style='top:"+ btnT+"px;right:"+btnL+"px;' src='img/rbtn.png'></img>"),
              $brand  = $("<div id='brand' class='" + that.cfg.className + "_brand' style='top:"+ brandT+"px;left:"+brandL+"px;'></div>");
              $text   = $("<p align='center' class='" + that.cfg.className + "_text'><strong>"+(num + 1)+"/"+that.cfg.src.length+"</strong></p>");
        
              $("body").prepend($mask).prepend($mimg).prepend($btnL).prepend($btnR).prepend($brand);
              $brand.append($text);

              $btnR.fadeTo(600,1);
              $btnL.fadeTo(600,1);
              $brand.fadeTo(600,0.7);
              $mimg.fadeTo(600,1,function(){ 
              $mask.click(function(){
                removebox();
              });
              $btnR.click(function(){
                !loading && switchPic('R');
              });
              $btnL.click(function(){
                !loading && switchPic('L');
              });
          });
          $mask.fadeTo(300,0.9);

          el = {
            $mask:$mask,
            $mimg:$mimg,
            $btnL:$btnL,
            $btnR:$btnR,
            $brand:$brand,
            $text:$text
          };
        });
    },
    switchPic = function(opt){
      var $mimg = el.$mimg;
          $mimg.unbind();

      if (opt == 'R' && num < that.cfg.src.length - 1) {
        loading = true;
        $mimg.fadeToggle(function(){
          $text.html('<strong>' + '加载中...' + '</strong>');
          switchRender(++ num);
        });
      } else if (opt == 'L' && num > 0) {
        loading = true;
        $mimg.fadeToggle(function(){
          $text.html('<strong>' + '加载中...' + '</strong>');
          switchRender(-- num);
        });

      } else {
        that.cfg.noPicFunc ? that.cfg.noPicFunc() : alert("没有图片了");
      }
    },
    switchRender = function(num){
      var $mimg         = el.$mimg,
          $text         = el.$text,
          windowHeight  = window.innerHeight,
          windowWidth   = window.innerWidth;
      $mimg.attr('src',that.cfg.src[num]).load(function(){
        $mimg.css("height",this.height).css("width",this.width).css("height",this.height);

        if(that.cfg.sizeLimit && (this.width > that.cfg.sizeLimit[0] || this.height > that.cfg.sizeLimit[1])){
          if(this.height > this.width ){
            this.width > windowWidth ? $mimg.css({'width':that.cfg.sizeLimit[0] + 'px','height':this.height*(that.cfg.sizeLimit[0]/this.width) + 'px'}) : $mimg.css({'height':that.cfg.sizeLimit[1] + 'px','width':this.width*(that.cfg.sizeLimit[1]/this.height) + 'px'})  ;

          }else{
            this.height > windowHeight ? $mimg.css({'height':that.cfg.sizeLimit[1] + 'px','width':this.width*(that.cfg.sizeLimit[1]/this.height) + 'px'}) : $mimg.css({'width':that.cfg.sizeLimit[0] + 'px','height':this.height*(that.cfg.sizeLimit[0]/this.width) + 'px'});
          }
        }

        $mimg.css({
          "top":(windowHeight - parseInt($mimg.css('height'))) / 2 + 'px',
          "left":(windowWidth - parseInt($mimg.css('width'))) / 2+ 'px'
        });

        $text.html('<strong>' + (num + 1) + '/' + that.cfg.src.length + '</strong>');
        $mimg.fadeIn();
        loading = false;
      });
    },
    removebox = function(){
      el.$mimg.fadeOut(500);
      el.$btnL.fadeOut(500);
      el.$btnR.fadeOut(500);
      el.$brand.fadeOut(500);
      el.$mask.fadeOut(600,function(){
        el.$mimg.remove();
        el.$mask.remove();
        el.$btnR.remove();
        el.$btnL.remove();
        el.$brand.remove();
      });
    };

    if(cfg.sizeLimit){
      cfg.sizeLimit[0] == 0 && (cfg.sizeLimit[0] = windowWidth );
      cfg.sizeLimit[1] == 0 && (cfg.sizeLimit[1] = windowHeight );
    }

    $.extend(this.cfg,cfg);

    this.cfg.src.length > 0 ? load(this.cfg.src[0]) : console.error('miss src');

  }

  return mbox ;

});