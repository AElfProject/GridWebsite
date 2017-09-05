// loadingPop
function LoadPop(options) {
    var self = this;
    var defaults = {
        theme: 'pop-load-default',
        content: '加载中……',
        position: 'top',
        hide: false,
        wrapper: 'body',
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        callback: false
    };
    this.settings = $.extend({}, defaults, options);
    this.ele = {};
    this.init();
    return this;
}
LoadPop.prototype = {
    init: function(){
        var self = this;
        var className = self.settings.theme +' pop-load'+ self.settings.status;
        if(self.settings.wrapper != 'body'){
            className += ' no-body';
        }
        self.ele.loadPop = $('<div class="pop-load '+ self.settings.theme +'"><div class="pop-load-box">'+ self.settings.content +'</div></div>');

        $(self.settings.wrapper).append(self.ele.loadPop);
        self.hide();
        if(self.settings.callback != '' && self.settings.callback != false && self.settings.callback != 'none'){
            self.settings.callback(self);
        }
    },
    hide: function(){
        var self = this;
        if(self.settings.hide != '' && self.settings.hide != false && self.settings.hide != 'none'){
            setTimeout(function(){
                $(self.ele.loadPop).fadeOut(function(){
                    $(self.ele.loadPop).remove();
                });
            }, self.settings.hide);
        }
    }
}
