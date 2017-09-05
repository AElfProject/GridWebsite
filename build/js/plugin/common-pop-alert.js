// Alert 弹窗
function AlertPop(options) {
    var self = this;
    var defaults = {
        theme: 'theme-default',
        title: '<span class="fs-16">操作</span>',
        content: '<article class="fs-14">操作提示</article>',
        closeBtn : true,
        closeBtnHtml : '<span class="close"><i></i><i></i></span>',
        status: 'warning',
        statusSize: '30',
        statusHtml : {
            'warning' : '<i class="fa fa-exclamation-circle color-warning"></i>',
            'question' : '<i class="fa fa-question-circle color-info"></i>',
            'success' : '<i class="fa fa-check-circle color-success"></i>',
            'fail' : '<i class="fa fa-times-circle color-danger"></i>',
        },
        btns : [
            // node, [name, href, target], isClose, callback
            ['div.button.button-md.button-warning', ['No'], true, null],
            ['div.button.button-md.button-primary', ['Yes'], true, null]
        ],
        hide: false
    };
    this.ele = {};
    this.settings = $.extend({}, defaults, options);
    this.init();
    return this;
}
AlertPop.prototype = {
    statusCur: function(status){
        var self = this;
        for(var i in self.settings.statusHtml){
            if(i == status) {
                return self.settings.statusHtml[status];
            }
        }
    },
    nodeSplit: function(str){
        var ay = str.split('.'),
            nodeName = ay[0],
            className = '';
        if(ay.length > 1){
            for(var j=1; j<=ay.length-1; j++){
                className += className+' '+ay[j];
            }
        }
        return {
            nodeName : nodeName,
            className : className
        };
    },
    init: function(){
        var self = this;
        self.ele.alertPopMask = $('<div class="alert-pop-mask '+ self.settings.theme +'-alert-pop-mask"></div>');
        self.ele.alertPopClose = $('<div class="alert-pop-close '+ self.settings.theme +'-alert-pop-close">'+ self.settings.closeBtnHtml +'</div>');
        self.ele.alertPopHtml = '';

        if(self.settings.title != false || self.settings.title != ''){
            self.ele.alertPopHtml += '<div class="alert-pop-title">'+ self.settings.title +'</div>';
        }
        if(self.settings.status != false || self.settings.status != ''){
            self.ele.alertPopHtml += '<span class="status" style="font-size:'+ self.settings.statusSize +'px">'+ self.statusCur(self.settings.status) +'</span>';
        }
        if(self.settings.content != false || self.settings.content != ''){
            self.ele.alertPopHtml += '<div class="alert-pop-content">'+ self.settings.title +'</div>';
        }
        if(self.settings.btns != false || self.settings.btns != '' || self.settings.btns.length > 0){
            self.ele.alertPopHtml += '<div class="alert-pop-btns clearfix"></div>';
        }
        self.ele.alertPopHtml = $('<div class="alert-pop '+ self.settings.theme +'-alert-pop"><div class="alert-pop-wrapper">'+ self.ele.alertPopHtml +'</div></div>');
        for(var i=0; i<= self.settings.btns.length-1; i++) {
            var btnNode = self.settings.btns[i][0],
                btnInfo = self.settings.btns[i][1],
                btnClose = self.settings.btns[i][2],
                btnCallBack = self.settings.btns[i][3];

            var nodeName = self.nodeSplit(btnNode).nodeName,
                className = self.nodeSplit(btnNode).className;

            var btnHtml = '';
            if(nodeName == 'a') {
                var href = btnInfo[1],
                    target = btnInfo[2];
                if(href == '' || href == null || href == undefined) {
                    btnHtml = $('<a class="alert-pop-btn '+ className +'" style="width:'+ (100 / self.settings.btns.length) +'%">'+ btnInfo[0] +'</a>');
                }else{
                    btnHtml = $('<a href="" class="alert-pop-btn '+ className +'" style="width:'+ (100 / self.settings.btns.length) +'%">'+ btnInfo[0] +'</a>');
                }
            }else if(nodeName == 'div'){
                btnHtml = $('<div class="alert-pop-btn '+ className +'" style="width:'+ (100 / self.settings.btns.length) +'%">'+ btnInfo[0] +'</div>');
            }
            self.ele.alertPopHtml.find('.alert-pop-btns').append(btnHtml);
        };

        if(self.settings.closeBtn){
            $('body').append(self.ele.alertPopMask).append(self.ele.alertPopClose).append(self.ele.alertPopHtml);
        }else{
            $('body').append(self.ele.alertPopMask).append(self.ele.alertPopHtml);
        }

        self.events();
        self.btnEvents(self.settings.btns);
        self.hideAuto();
    },
    hideAuto: function(){
        var self = this;
        if(self.settings.hide != false || self.settings.hide != ''){
            setTimeout(function(){
                self.destory();
            }, self.settings.hide);
        }
    },
    btnEvents: function(btns){
        var self = this;
        var btnFn = function(i){
            self.ele.alertPopHtml.find('.alert-pop-btn').eq(i).bind('click', function(){
                if(btns[i][3] != null) {
                    btns[i][3](self);
                }
                if(btns[i][2]){
                    self.destory();
                }
                return false;
            });
        }
        for(var i=0; i<= btns.length-1; i++) {
            btnFn(i);
        }
    },
    events: function(){
        var self = this;
        self.ele.alertPopMask.bind('click', function(){
            self.destory();
        });
        self.ele.alertPopClose.bind('click', function(){
            self.destory();
        });
    },
    destory: function(){
        var self = this;
        $(self.ele.alertPopMask).fadeOut(function(){
            $(self.ele.alertPopMask).remove();
        });
        $(self.ele.alertPopClose).fadeOut(function(){
            $(self.ele.alertPopClose).remove();
        });
        $(self.ele.alertPopHtml).fadeOut(function(){
            $(self.ele.alertPopHtml).remove();
        });
    }
}
