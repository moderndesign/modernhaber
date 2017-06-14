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
