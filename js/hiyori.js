var home = location.href,
  s = $('#bgvideo')[0],
  Siren = {
    splay: function () {
      $('#video-btn').addClass('video-pause').removeClass('video-play').show()
      $('.video-stu').css({
        'bottom': '-100px'
      })
      s.play()
    }, spause: function () {
      $('#video-btn').addClass('video-play').removeClass('video-pause')
      s.pause()
    }, liveplay: function () {
      if (s.oncanplay != undefined && $('.haslive').length > 0) {
        if ($('.videolive').length > 0) {
          Siren.splay()
        }
      }
    }, livepause: function () {
      if (s.oncanplay != undefined && $('.haslive').length > 0) {
        Siren.spause()
        $('.video-stu').css({
          'bottom': '0px'
        }).html('已暂停 ...')
      }
    }, addsource: function () {
      $('.video-stu').html('正在载入视频 ...').css({
        'bottom': '0px'
      })
      var t = Poi.movies.name.split(','),
        _t = t[Math.floor(Math.random() * t.length)]
      $('#bgvideo').attr('src', Poi.movies.url + '/' + _t)
      $('#bgvideo').attr('video-name', _t)
    }, LV: function () {
      var _btn = $('#video-btn')
      _btn.on('click', function () {
        if ($(this).hasClass('loadvideo')) {
          $(this).addClass('video-pause').removeClass('loadvideo').hide()
          Siren.addsource()
          s.oncanplay = function () {
            Siren.splay()
            $('#video-add').show()
            _btn.addClass('videolive')
            _btn.addClass('haslive')
          }
        } else {
          if ($(this).hasClass('video-pause')) {
            Siren.spause()
            _btn.removeClass('videolive')
            $('.video-stu').css({
              'bottom': '0px'
            }).html('已暂停 ...')
          } else {
            Siren.splay()
            _btn.addClass('videolive')
          }
        }
        s.onended = function () {
          $('#bgvideo').attr('src', '')
          $('#video-add').hide()
          _btn.addClass('loadvideo').removeClass('video-pause')
          _btn.removeClass('videolive')
          _btn.removeClass('haslive')
        }
      })
      $('#video-add').on('click', function () {
        Siren.addsource()
      })
    }, AH: function () {
      if (Poi.windowheight == 'auto') {
        if ($('h1.main-title').length > 0) {
          var _height = $(window).height()
          $('#centerbg').css({
            'height': _height
          })
          $('#bgvideo').css({
            'min-height': _height
          })
          $(window).resize(function () {
            Siren.AH()
          })
        }
      } else {
        $('.headertop').addClass('headertop-bar')
      }
    }, PE: function () {
      if ($('.headertop').length > 0) {
        if ($('h1.main-title').length > 0) {
          $('.blank').css({
            'padding-top': '0px'
          })
          $('.headertop').css({
            'height': 'auto'
          }).show()
          if (Poi.movies.live == 'open') Siren.liveplay()
        } else {
          $('.blank').css({
            'padding-top': '75px'
          })
          $('.headertop').css({
            'height': '0px'
          }).hide()
          Siren.livepause()
        }
      }
    }
  }
$(function () {
	Siren.addsource()
  Siren.AH()
  Siren.PE()
  Siren.LV()
})

jQuery(document).ready(function($){
	var mainHeader = $('.cd-auto-hide-header'),
		secondaryNavigation = $('.cd-secondary-nav'),
		//this applies only if secondary nav is below intro section
		belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height();
	
	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

	mainHeader.on('click', '.nav-trigger', function(event){
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
	});

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		( belowNavHeroContent.length > 0 ) 
			? checkStickyNavigation(currentTop) // secondary navigation below intro
			: checkSimpleNavigation(currentTop);

	   	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
	    if (previousTop - currentTop > scrollDelta) {
	    	//if scrolling up...
	    	mainHeader.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	//if scrolling down...
	    	mainHeader.addClass('is-hidden');
	    }
	}

	function checkStickyNavigation(currentTop) {
		//secondary nav below intro section - sticky secondary nav
		var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();
		
		if (previousTop >= currentTop ) {
	    	//if scrolling up... 
	    	if( currentTop < secondaryNavOffsetTop ) {
	    		//secondary nav is not fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('fixed slide-up');
	    		belowNavHeroContent.removeClass('secondary-nav-fixed');
	    	} else if( previousTop - currentTop > scrollDelta ) {
	    		//secondary nav is fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('slide-up').addClass('fixed'); 
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}
	    	
	    } else {
	    	//if scrolling down...	
	 	  	if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
	 	  		//hide primary nav
	    		mainHeader.addClass('is-hidden');
	    		secondaryNavigation.addClass('fixed slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	} else if( currentTop > secondaryNavOffsetTop ) {
	    		//once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.addClass('fixed').removeClass('slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}

	    }
	}
});
// $(function(){
// 	var player = document.getElementById("player");
// 	var audio = document.createElement("audio");
// 	player.append(audio);
//         var bar = $("#progressDiv");
//         var img = $(".player__imgurl img");
//         function playMusic(fleg) {
//             $.getJSON('https://api.uomg.com/api/rand.music?sort=%E7%83%AD%E6%AD%8C%E6%A6%9C&format=json', function (json, textStatus) {
//                 if (json.code == 1) {
//                     // currAlbum = json.data.artistsname;
//                     var currTrackName = json.data.name;
//                     var currArtwork = json.data.picurl;
//                     audio.src = json.data.url;
//                     }
//                     if (fleg == 1) {
//                         img.attr('src', currArtwork)
//                         $(".player__songname").text(currTrackName)
//                         audio.play();
//                     }
//                     else {
//                         img.attr('src', currArtwork)
//                         $(".player__songname").text(currTrackName)
//                     }
//             }
//             )
//         }

//         audio.addEventListener("timeupdate", function () {
//             var currentTime = audio.currentTime;
//             var totalTime = audio.duration;
//             if (!isNaN(totalTime)) {
//                 var rate = currentTime / totalTime;
//                 bar.css("width", rate * 100 + "%");
//             }
//             if (currentTime == totalTime) {
//                 $('.player').removeClass('play');
//                 $('.player').addClass('play');
//                 playMusic(1)
//             }
//         });

//         $('.player__play').click(function () {
//             if ($('.player').hasClass('play')) {
//                 $('.player').removeClass('play');
//                 audio.pause()
//             } else {
//                 $('.player').addClass('play');
//                 audio.play();
//             }
//         });
//         $('.player__next').click(function () {
//             if ($('.player').hasClass('play')) {
//                 bar.width(0)
//                 playMusic(1)
//             } else {
//                 $('.player').addClass('play');
//                 bar.width(0)
//                 playMusic(1)
//             }

//         });
//         $('.player__prev').click(function () {
//             if ($('.player').hasClass('play')) {
//                 bar.width(0)
//                 playMusic(1)
//             } else {
//                 $('.player').addClass('play');
//                 bar.width(0)
//                 playMusic(1)
//             }

//         });
// 		playMusic(0)

// })