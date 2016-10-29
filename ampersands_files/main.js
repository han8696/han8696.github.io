$(document).ready(function() {
	var main;
	main = new PagePlugin();
	$(window).on('load',this,function(){
		main.init();
		
		$(document).on('click','a[href^=#]',function(){
			main.pageScroll(this);
		});
		$(window).on('resize',this,function(){
			main.resizeWindow();
		});
		$(window).on('scroll',this,function(){
			main.headerPosition($(this).scrollTop());
		});
		$(document).on('mouseover','.pc-link,.link-text',function(){
			main.thumbHover(this);
		});
		$(document).on('mouseout','.pc-link,.link-text',function(){
			main.thumbOutHover(this);
		});
		$('.project-list-inview li').on('inview', function() {
			$(this).stop().animate({opacity: 1}, 1000);
		});
	});
});	
// クラス定義（コンストラクタ）
PagePlugin = function(op) {
	this.speed=500;
	this.fadeTime=1000;
	this.ww=$(window).innerWidth();
	this.wh=$(window).innerHeight();
	this.bp=768;
	this.ua="";
	this.pcLinkSize=$('.pc-link').size();
	this.spHeaderH=$('header').height();
	this.start_pos = 0;
};
// メソッド定義
PagePlugin.prototype = {
	init: function(){
		var self;
		self = this;
		
		/*
		Topムービーの全画面表示
		*/
		//self.fitWindow();
		/*
		pc/sp 判定
		*/
		self.uaJuge();
		self.attrHref();
		self.fixHeaderHight();
		self.loadingOut();
	},
	resizeWindow:function(){
		var self;
		self=this;
		self.ww=$(window).innerWidth();
		self.wh=$(window).innerHeight();
		self.fitWindow();
		self.uaJuge();
		self.attrHref();
		self.fixHeaderHight();
	},
	fixHeaderHight:function(){
		var self;
		self=this;
		self.spHeaderH=$('header').height();
		$('body').css('paddingTop',self.spHeaderH+'px');
	},
	pageScroll:function(el){
		var self,href,target,position;
		self = this;
		
		href= $(el).attr("href");
		target = $(href == "#" || href == "" ? 'html' : href);
		position = target.offset().top;
		$("html, body").animate({scrollTop:position}, self.speed);
	},
	uaJuge:function(){
		var self;
		self=this;
		if(self.ww<=self.bp){
			self.ua="sp";
		}else{
			self.ua="pc";
	
		}
	},
	loadingOut:function(){
		$('.loadingLay').delay(500).fadeOut(self.fadeTime);
	},
	fitWindow:function(){
		var self;
		self=this;
		//$('.top-movie').css({'height':self.wh+'px','width':self.ww+'px'});
	},
	attrHref:function(){
		var self;
		self=this;
		if(self.ua=="pc"){
			self.uaPc();

		}else{
			self.uaSp();
		}
	},
	uaPc:function(){
		var self,data="";
		self=this;
		for(var i=0;i<self.pcLinkSize;i++){
			data=$('.pc-link:eq('+i+')').data('href');
			$('.pc-link:eq('+i+')').attr('href',data);
		}
	},
	uaSp:function(){
		var self,cl;
		self=this;
		
		for(var i=0;i<self.pcLinkSize;i++){
			if($('.pc-link:eq('+i+')').hasClass('project-list-thumb')){
				data=$('.pc-link:eq('+i+')').data('href');
				$('.pc-link:eq('+i+')').attr('href',data);
			}else{
				$('.pc-link:eq('+i+')').attr('href','javascript:void(0);');
			}
			
		}
	},
	headerPosition:function(axisY){
		var self,current_pos;
		self=this;
		current_pos = axisY;
		if (current_pos > self.start_pos && axisY > 100) {
			$('header').addClass('hide');
			if($('.about-nav-wrap').size()>0){
				$('.about-nav-wrap').addClass('hide');
			}
		} else {
			$('header').removeClass('hide');
			if($('.about-nav-wrap').size()>0){
				$('.about-nav-wrap').removeClass('hide');
			}

		}
		self.start_pos = current_pos;
	
	},
	thumbHover:function(el){
		var self,index,cl;
		self=this;
		$(el).parent('li').find('.pc-link').addClass('thumb-hover');
	},
	thumbOutHover:function(el){
		var self,index,cl;
		self=this;
		$(el).parent('li').find('.pc-link').removeClass('thumb-hover');
	}
	
	
	
	
};
