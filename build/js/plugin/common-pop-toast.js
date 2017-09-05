
function Toast(options) {
    var self = this;
    var defaults = {
        theme: 'toast-default',
        wrapper: 'body',
        hide: '2000',
        status: 'success',
        statusHtml: {
            'success' : '<i class="fa fa-check"></i><p>已完成</p>',
            'failed' : '<i class="fa fa-check"></i><p>失败</p>',
            'loading' : '<i class="fa fa-circle-spinner fa-spin"></i><p>数据加载中……</p>',
        }
    }
    this.ele = {};
    this.settings = $.extend({}, defaults, options);
    this.init();
    return this;
}
Toast.prototype = {
    init: function(){
        var self = this;
        var className = self.settings.theme +' toast'+ self.settings.status;
        if(self.settings.wrapper != 'body'){
            className += ' no-body';
        }
        self.ele.toast = $('<div class="'+ className +'" style="display:none;">'+ self.settings.statusHtml[self.settings.status] +'</div>');
        $(self.settings.wrapper).append(self.ele.toast);
        $(self.ele.toast).fadeIn(function(){
            self.events();
        });
    },
    events: function(){
        var self = this;
        if(typeof self.settings.callback === 'function') {
            self.settings.callback(self);
        }else{
            self.hide();
        }
    },
    hide: function(){
        var self = this;
        setTimeout(function(){
            $(self.ele.toast).fadeOut(function(){
                $(this).remove()
            });
        }, self.settings.hide);
    }
}
