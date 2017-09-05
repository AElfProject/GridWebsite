/*
 * legend common plugin
 * Author: lijundong
 */

function Legend() {
  return this;
}
Legend.prototype.init = function(){
    this.tipClose();
    this.pop.init();
}


Legend.prototype.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};
Legend.prototype.getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
};
Legend.prototype.delCookie = function(name) {
    this.setCookie(name, "", -1);
};


Legend.prototype.pop = {
    size : function(){
        $('.com-pop').css({
            height: 'auto'
        });
        var h = $('.com-pop').outerHeight(true);
        if(h > $(window).height()){
            h = $(window).height();
        }
        if(h % 2 !== 0){
            $('.com-pop').css({
                height: h+1
            })
        }
    },
    close : function(){
        $('.com-pop, .com-pop-mask').fadeOut();
    },
    open : function(ele){
        var _this = this;
        if(ele != ''){
            $('.change-'+ ele).show().siblings().hide();
        }else{
            $('.change-name').eq(0).show().siblings().hide();
        }
        $('.com-pop, .com-pop-mask').fadeIn(function(){
            _this.size();
        });
    },
    init: function(){
        var _this = $(this);
        $('.com-pop-close, .com-pop-mask').bind('click', function(){
            _this.close();
        });
    }
};


Legend.prototype.alertPop = function(options){
    var alertPop = new AlertPop(options);
    return alertPop;
};


Legend.prototype.loadPop = function(options){
    var loadPop = new LoadPop(options);
    return loadPop;
}


Legend.prototype.tipPop = function(options){
    var tipPop = new TipPop(options);
    return tipPop;
}


Legend.prototype.toastPop = function(options){
    var toast = new Toast(options);
    return toast;
}


Legend.prototype.evenHeight = function(ele){
    $(ele).outerHeight('auto');
    var h = $(ele).outerHeight();
    if(h >= $(window).height()){
        $(ele).outerHeight($(window).height());
    }
    if(h % 2 != 0){
        $(ele).outerHeight(h+1);
    }
}


Legend.prototype.tipClose = function(options){
    var defaults = {
        animateIn: 'fadeIn',
        animateOut: 'fadeOut'
    };
    var settings = $.extend({}, defaults, options);
    $('body .tip-close').each(function(){
        $(this).bind('click', function(){
            $(this).parent().removeClass(settings.animateIn).addClass(settings.animateOut);
            setTimeout(function(){
                $(this).parent().remove();
            }, 1000);
        });
    });
};


;(function($){
    window.legend = new Legend();
    var time = null;
    $(window).resize(function(){
        clearTimeout(time);
        time = setTimeout(function(){
        legend.pop.size();
        });
    });
})(jQuery);
