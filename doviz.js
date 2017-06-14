$(document).ready(function(){
	var usd = document.getElementById("try");
	var eur = document.getElementById("eur");
	var jpy = document.getElementById("jpy");
	var gbp = document.getElementById("gbp");
	var uah = document.getElementById("uah");

	$.when(
			$.ajax({
				url: 'https://currency-api.appspot.com/api/TRY/USD.jsonp',
				dataType: "jsonp",
				data: {amount: '1.00'},
				success: function(res) {
					usd.innerHTML = "$ " + parseFloat(res.rate).toFixed(2);
				},
				error: function(res) {
					console.log('Hata: ' + res);	
				}
			}),
			$.ajax({
				url: 'https://currency-api.appspot.com/api/TRY/EUR.jsonp',
				dataType: "jsonp",
				data: {amount: '1.00'},
				success: function(res) {
					eur.innerHTML = "€ " + parseFloat(res.rate).toFixed(2);
				},
				error: function(res) {
					console.log('Hata: ' + res);	
				}
			}),
			$.ajax({
				url: 'https://currency-api.appspot.com/api/TRY/JPY.jsonp',
				dataType: "jsonp",
				data: {amount: '1.00'},
				success: function(res) {
					jpy.innerHTML = "¥ " + parseFloat(res.rate).toFixed(2);
				},
				error: function(res) {
					console.log('Hata: ' + res);	
				}
			}),
			$.ajax({
				url: 'https://currency-api.appspot.com/api/TRY/GBP.jsonp',
				dataType: "jsonp",
				data: {amount: '1.00'},
				success: function(res) {
					gbp.innerHTML = "£ " + parseFloat(res.rate).toFixed(2);
				},
				error: function(res) {
					console.log('Hata: ' + res);	
				}
			})
	).then(function() {
    	console.log('Hepsi Tamam!');
    });
});
	

$(document).ready(function() {
  var block_arr = $('.para tspan').map(function() { return $(this).get(0);}).toArray();
  
  var ticker_item = $(block_arr[0]);
  $(".para").html(ticker_item);
  var ticker_width = $(".para").width();
  var text_x = ticker_width;
    
  console.log(block_arr.indexOf(ticker_item.get(0)));
  console.log(block_arr.length);

  scroll_ticker = function() {    
    text_x--;
    ticker_item.css("left", text_x);
    if (text_x < -1 * ticker_item.width()) {
      ticker_item = $(block_arr[(block_arr.indexOf(ticker_item.get(0)) + 1 == block_arr.length) ? 0 : block_arr.indexOf(ticker_item.get(0)) + 1]);
      ticker_item.css("left", text_x);
      $(".para").html(ticker_item);
      text_x = ticker_width;
    }
  }
  setInterval(scroll_ticker, 5000);
});



jQuery(document).ready(function($) {
 
	var $all_oembed_videos = $("iframe[src*='youtube']");
	
	$all_oembed_videos.each(function() {
	
		$(this).removeAttr('height').removeAttr('width').wrap( "<div class='embed-container'></div>" );
 	
 	});
 
});



(function() {
	
	function Slideshow( element ) {
		this.el = document.querySelector( element );
		this.init();
	}
	
	Slideshow.prototype = {
		init: function() {
			this.wrapper = this.el.querySelector( ".slider-wrapper" );
			this.slides = this.el.querySelectorAll( ".slide" );
			this.previous = this.el.querySelector( ".slider-previous" );
			this.next = this.el.querySelector( ".slider-next" );
			this.index = 0;
			this.total = this.slides.length;
			this.timer = null;
			
			this.action();
			this.stopStart();	
		},
		_slideTo: function( slide ) {
			var currentSlide = this.slides[slide];
			currentSlide.style.opacity = 1;
			
			for( var i = 0; i < this.slides.length; i++ ) {
				var slide = this.slides[i];
				if( slide !== currentSlide ) {
					slide.style.opacity = 0;
				}
			}
		},
		action: function() {
			var self = this;
			self.timer = setInterval(function() {
				self.index++;
				if( self.index == self.slides.length ) {
					self.index = 0;
				}
				self._slideTo( self.index );
				
			}, 5000);
		},
		stopStart: function() {
			var self = this;
			self.el.addEventListener( "mouseover", function() {
				clearInterval( self.timer );
				self.timer = null;
				
			}, false);
			self.el.addEventListener( "mouseout", function() {
				self.action();
				
			}, false);
		}
		
		
	};
	
	document.addEventListener( "DOMContentLoaded", function() {
		
		var slider = new Slideshow( ".slider-wrapper" );
		
	});
	
	
})();




(function(a){a.fn.vTicker=function(b){var c={speed:700,pause:4000,showItems:3,animation:"",mousePause:true,isPaused:false,direction:"up",height:0};var b=a.extend(c,b);moveUp=function(g,d,e){if(e.isPaused){return}var f=g.children("text");var h=f.children("tspan:first").clone(true);if(e.height>0){d=f.children("tspan:first").height()}f.animate({top:"-="+d+"px"},e.speed,function(){a(this).children("tspan:first").remove();a(this).css("top","0px")});if(e.animation=="fade"){f.children("tspan:first").fadeOut(e.speed);if(e.height==0){f.children("tspan:eq("+e.showItems+")").hide().fadeIn(e.speed)}}h.appendTo(f)};moveDown=function(g,d,e){if(e.isPaused){return}var f=g.children("text");var h=f.children("tspan:last").clone(true);if(e.height>0){d=f.children("tspan:first").height()}f.css("top","-"+d+"px").prepend(h);f.animate({top:0},e.speed,function(){a(this).children("tspan:last").remove()});if(e.animation=="fade"){if(e.height==0){f.children("tspan:eq("+e.showItems+")").fadeOut(e.speed)}f.children("tspan:first").hide().fadeIn(e.speed)}};return this.each(function(){var f=a(this);var e=0;f.css({overflow:"hidden",position:"relative"}).children("text").css({position:"absolute",margin:0,padding:0}).children("tspan").css({margin:0,padding:0});if(b.height==0){f.children("text").children("tspan").each(function(){if(a(this).height()>e){e=a(this).height()}});f.children("text").children("tspan").each(function(){a(this).height(e)});f.height(e*b.showItems)}else{f.height(b.height)}var d=setInterval(function(){if(b.direction=="up"){moveUp(f,e,b)}else{moveDown(f,e,b)}},b.pause);if(b.mousePause){f.bind("mouseenter",function(){b.isPaused=true}).bind("mouseleave",function(){b.isPaused=false})}})}})(jQuery);


$(function(){
	$("#news-container").vTicker({ 
		speed: 500,
		pause: 3000,
		animation: 'fade',
		mousePause: false,
		showItems: 3
	});
$("#news-container1").vTicker({ 
		speed: 300,
		pause: 4000,
		animation: 'fade',
		mousePause: true,
		showItems: 1
	});
});

