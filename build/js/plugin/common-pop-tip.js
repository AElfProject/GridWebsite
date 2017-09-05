// tipPop
function TipPop(options) {
    var self = this;
    var defaults = {
        content: '可手动关闭弹窗',
        place: false,
        position: 'top',
        closed: true,
        closedHtml: '<span class="tip-close button button-circle button-sm button-success"><i class="fa fa-times"></i></span>',
        rounded: false,
        hide: false,
        animateIn: 'bounce',
        animateOut: 'fadeOutUp',
        status: 'success',
        statusSize: '30',
        statusHtml : {
            'warning' : ['<i class="fa fa-exclamation-circle mr10"></i>', '<span class="tip-close button button-circle button-sm button-success"><i class="fa fa-times"></i></span>'],
            'info' : ['<i class="fa fa-question-circle mr10"></i>', '<span class="tip-close button button-circle button-sm button-success"><i class="fa fa-times"></i></span>'],
            'success' : ['<i class="fa fa-check-circle mr10"></i>', '<span class="tip-close button button-circle button-sm button-success"><i class="fa fa-times"></i></span>'],
            'danger' : ['<i class="fa fa-times-circle mr10"></i>', '<span class="tip-close button button-circle button-sm button-danger"><i class="fa fa-times"></i></span>'],
            'primary' : ['<i class="fa fa-times-circle mr10"></i>', '<span class="tip-close button button-circle button-sm button-primary"><i class="fa fa-times"></i></span>']
        }
    };
    this.settings = $.extend({}, defaults, options);
    this.init();
    return this;
}
TipPop.prototype = {
    init: function(){
        var self = this;
        var tipClass = '';
        if(self.settings.rounded != 'none' || self.settings.rounded != false || self.settings.rounded != ''){
            tipClass += 'tip-'+self.settings.rounded + ' ';
        }
        if(self.settings.status != 'none'){
            tipClass += 'tip-'+self.settings.status + ' ';
        }
        if(self.settings.closed){
            self.tipPopHtml = $('<div class="tip-box clearfix '+ tipClass +'"><span class="tip-status">'+ self.settings.statusHtml[self.settings.status] +'</span>'+ self.settings.content + self.settings.closedHtml +'</div>');
        }else{
            self.tipPopHtml = $('<div class="tip-box clearfix '+ tipClass +'"><span class="tip-status">'+ self.settings.statusHtml[self.settings.status] +'</span>'+ self.settings.content +'</div>');
        }
        if(self.settings.position != '' || self.settings.place != 'none' || self.settings.place != false){
            self.tipPopHtml.css({
                'position': 'fixed',
                'left': '0',
                'right': '0'
            });
            if(self.settings.position == 'top') {
                self.tipPopHtml.css({
                    'top': '0'
                });
            }else if(self.settings.position == 'center') {
                self.tipPopHtml.css({
                    'top': '50%'
                });
            }else if(self.settings.position == 'bottom') {
                self.tipPopHtml.css({
                    'bottom': '0'
                });
            }
        }

        if(self.settings.animateIn != '' || self.settings.animateIn != 'none' || self.settings.animateIn != false){
            self.tipPopHtml.addClass('animated '+self.settings.animateIn)
        }

        if(self.settings.place == '' || self.settings.place == 'none' || self.settings.place == false){
            $('body').append(self.tipPopHtml);
        }else{
            $(self.settings.place).append(self.tipPopHtml);
        }

        self.events();
        self.hideAuto();
    },
    hideAuto: function(){
        var self = this;
        if(self.settings.hide != false) {
            setTimeout(function(){
                self.destory();
            }, self.settings.hide);
        }
    },
    events: function(){
        var self = this;
        self.tipPopHtml.find('.tip-close').bind('click', function(){
            self.destory();
        });
    },
    destory: function(){
        var self = this;
        if(self.settings.animateIn == '' || self.settings.animateIn == 'none' || self.settings.animateIn == false){
            self.tipPopHtml.remove();
        }
        else {
            self.tipPopHtml.removeClass(self.settings.animateIn).addClass(self.settings.animateOut);
            setTimeout(function(){
                self.tipPopHtml.remove();
            }, 1000);
        }
    }
}
