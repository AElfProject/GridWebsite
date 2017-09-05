// 菜单固定，页面滚动
if($('.story-step').length){
	// anchor-hd 要写 data-anchor="anchor-name"
	// anchor-bd 要写 id="anchor-name"
	var anchorHd = $('.story-pagination'),
		anchorHdItem = $('.story-pagination .anchor-hd'),
		anchorBd = $('.story-step'),
		anchorBdItem = $('.story-step .anchor-bd');

	var hDetailMenu = function(){
		if($(window).scrollTop() > anchorBd.offset().top){
			anchorHd.addClass('active');
		}else{
			anchorHd.removeClass('active');
		}
	};
	var hDetailMenuBd = function(){
		var len = anchorHdItem.length;
		for(var i=len; i>0; i--){
			var $this = anchorBdItem.eq(i-1),
				$id = $this.attr('id');
			if($this.offset().top <= $(window).scrollTop() + $(window).height() / 2){
				console.log($id);
				anchorHdItem.each(function(){
					var $this = $(this);
					if ($this.attr('data-anchor') == $id){
						$this.addClass('active').siblings().removeClass('active');
					}
				});
				break;
			}
		}
	};

	anchorHdItem.each(function(){
		var $this = $(this);
		$this.bind('click', function(){
			var $id = $this.attr('data-anchor');
			$('body, html').stop(true).animate({
				scrollTop : $('#'+$id).offset().top - $('.header').outerHeight(true) + 2
			});
		});
	});
	//hDetailMenu();
	hDetailMenuBd();
	$(window).scroll(function(){
		if(anchorBd.length) {
			//hDetailMenu();
			hDetailMenuBd();
		}
	});
}




// 创建手机版导航
// css样式
// .mobile-side-btn {
// 	position: absolute;
// 	right: 0;
// 	top: 50%;
// 	color: #fff;
// 	cursor: pointer;
// 	@include px($FS30);
// 	@include translate(0, -50%);
// }
// .mobile-side {
// 	position: fixed;
// 	top: 0;
// 	left: 0;
// 	bottom: 0;
// 	right: 20%;
// 	z-index: 9;
// 	background-color: $color-3;
// 	box-shadow: $shadow1;
// 	@include px($FS20);
// 	@include translate(-100%, 0);
// 	@include transition(all 0.5s ease-in-out);
// 	&.active {
// 		@include translate(0, 0);
// 	}
// 	.mobile-nav {
// 		li {
// 			a {
// 				display: block;
// 				padding: 0.5em 1em;
// 				line-height: 1.2em;
// 				color: #fff;
// 				border-bottom: 1px solid darken($color-3, 4);
// 				@at-root .no-touch &:hover,
// 				&.active {
// 					color: #fff;
// 					background: darken($color-3, 7);
// 				}
// 			}
// 		}
// 	}
// }


/*

var bodyScrollTop = 0;
var isHasSide = false;
var createSide = function(ele){
	isHasSide = true;
	var mobileNav = $('<nav class="mobile-nav clearfix">'+ $('.nav').html() +'</nav>');
	var mobileSide = $('<div class="mobile-side clearfix"></div>').append(mobileNav);
	var mobileSideBtn = $('<div class="mobile-side-btn"><i class="fa fa-navicon"></i></div>');
	$('body').append(mobileSide);
	$('.header .wrapper').append(mobileSideBtn);

	mobileSideBtn.bind('click', function(){
		if(mobileSide.hasClass('active')){
			closeNav();
		}else{
			openNav();
		}
	});
};
var removeSide = function(){
	$('.mobile-side-btn').unbind('click');
	$('.mobile-side, .mobile-side-btn').remove();
	isHasSide = false;
};
var openNav = function(){
	bodyScrollTop = $(window).scrollTop();
	$('body, html').css({
		'overflow' : 'hidden'
	});
	$('.container').addClass('mobile-side-active');
	$('.mobile-side').addClass('active');
	$('.mobile-side-btn').find('.fa').removeClass('fa-navicon').addClass('fa-close');
};
var closeNav = function(){
	$(window).scrollTop(bodyScrollTop);
	$('body, html').css({
		'overflow' : 'auto',
		'overflow-x' : 'hidden'
	});
	if(isHasSide){
		$('.container').removeClass('mobile-side-active');
		$('.mobile-side').removeClass('active');
		$('.mobile-side-btn').find('.fa').removeClass('fa-close').addClass('fa-navicon');
	}
};
var sideIsCreate = function(){
	if($(window).width() <= 980 && !isHasSide){
		createSide();
	}else if($(window).width() > 980 && isHasSide){
		closeNav();
		removeSide();
	}
};
sideIsCreate();

$(window).resize(function(){
	sideIsCreate();
});
*/



// 弹窗
// html代码
// <section class="com-pop-mask"></section>
// <section class="com-pop-close"></section>
// <section class="com-pop">
// 	<div class="pop-wrapper">
// 		<div class="change-name change-rentalAppraisal">
// 		</div>
// 	</div>
// </section>




// 读取 xml
function loadXmlFile(xmlFile){
	var xmlDom = null;
	if (window.ActiveXObject){
		xmlDom = new ActiveXObject("Microsoft.XMLDOM");
		xmlDom.loadXML(xmlFile);//如果用的是XML字符串
		//xmlDom.load(xmlFile);//如果用的是xml文件。
	}else if (document.implementation && document.implementation.createDocument){
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", xmlFile, false);
		xmlhttp.send(null);
		xmlDom = xmlhttp.responseXML;
	}else{
		xmlDom = null;
	}
	return xmlDom;
}
// 获取 xml 节点内容
// var getXmlNode = function(){
// 	var xml = loadXmlFile('http://twitrss.me/twitter_user_to_rss/?user=dysinpartners');
// 	var twitterRss_article = twitterRss.getElementsByTagName('item');
// 	var matches1 = twitterRss_description.match(/lang="en">(.*)<a/i)[1];
// 	var matches2 = twitterRss_description.match(/src="([^'"]+)"/i)[1];
// 	var matches3 = twitterRss_description.match(/href="([^'"]+)"/i)[1];
// }







;(function($){
	var wst	= $(window).scrollTop(),
		wh	= $(window).height(),
		ww	= $(window).width();

	$(window).scroll(function(){
		wst	= $(window).scrollTop();
	});


	$.fn.extend({
		// 依赖 perfect-scrollbar 插件
		scrollBar : function(){
			this.each(function(){
				var _this = $(this);
				_this.perfectScrollbar();
				var time = null;
				$(window).resize(function(){
					clearTimeout(time);
					time = setTimeout(function(){
						_this.perfectScrollbar('update');
					}, 300);
				});
			});
			return this;
		}
	});
})(jQuery);

$('.scroll-bd').scrollBar();




$(function(){
	$(function(){
		//对所有的计时器进行处理
		var timers=$(".timer-simple-seconds");
		for(var i=0;i<timers.length;i++){
			var timer=$(timers[i]);

			if(timer.attr("timestamp")){
				//如果是时间戳，则预处理一下时间为倒计时秒数
				prepareProcessTimestamp2Timer(timer);
			}else if(timer.attr("datetime")){
				//处理时间格式为倒计时秒数
				prepareProcessDatetime2Timer(timer);
			}
			//先调用一次，避免误差
			processTimer(timer);
			setInterval(processTimer,1000,timer);
		}

		/**
		 * doWhat: 这个函数将时间戳预处理成统一的倒计时描述
		 *
		 * 对时间做一个预处理，因为如果服务器直接返回剩余的描述的话从服务器相应到客户端虽然短到几百毫秒但总是会有偏差的，这样子不太好
		 * 所以服务器只需要设置一个时间戳表示到哪里停止就可以了
		 */
		function prepareProcessTimestamp2Timer(timer){
			var total=parseInt(timer.attr("timestamp"));
			total=Math.round(total/1000);
			var now=new Date().getTime()/1000;
			timer.attr("timer",total-now);
		}

		/**
		 * 将日期时间格式转为倒计时格式
		 */
		function prepareProcessDatetime2Timer(timer){
			var timestamp=new Date(timer.attr("datetime")).getTime();
			timer.attr("timestamp",timestamp);
			prepareProcessTimestamp2Timer(timer);
		}

		/**
		 * 倒计时，滴答滴答...
		 * @param {Object} timer
		 */
		function processTimer(timer){
			var total=parseInt(timer.attr("timer"));
			var t=total;

			//倒计时不能为负
			if(total<0) return; //TODO 后续版本加上计时完毕可以回调函数

			//找到显示时间的元素
			var day=timer.find(".day");
			var hour=timer.find(".hour");
			var minute=timer.find(".minute");
			var second=timer.find(".second");

			//刷新计时器显示的值
			if(day.length){
				var d=Math.floor(t/(60*60*24));
				day.text(d);
				t-=d*(60*60*24);
			}
			if(hour.length){
				var h=Math.floor(t/(60*60));
				hour.text((h<10?"0":"")+h);
				t-=h*(60*60);
			}
			if(minute.length){
				var m=Math.floor(t/60);
				minute.text((m<10?"0":"")+m);
				t-=m*60;
			}
			if(second.length){
				console.log('3');
				second.text((t<10?"0":"")+t);
			}

			//一秒过去了...
			total--;
			timer.attr("timer",total);
		}

	});
});