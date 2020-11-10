var home = location.href,
  s = $('#bgvideo')[0],
  Siren = {
    BSZ: function() {
      $.getScript('//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js')
    }, splay: function () {
      $('#video-btn').addClass('video-pause').removeClass('video-play').show()
      $('.video-stu').css({
        'bottom': '-100px'
      })
      $('.content-home').css({
        'top': '-999px'
      })
      $('#banner_wave_1').addClass('banner_wave_hide')
      $('#banner_wave_2').addClass('banner_wave_hide')
      s.play()
    }, spause: function () {
      $('#video-btn').addClass('video-play').removeClass('video-pause')
      $('.focusinfo').css({
        'top': '49.3%'
      })
      $('#banner_wave_1').removeClass('banner_wave_hide')
      $('#banner_wave_2').removeClass('banner_wave_hide')
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
          $('.content-home').css({
            'top': '49.3%'
          })
        }
      })
      $('#video-add').on('click', function () {
        Siren.addsource()
      })
    }
  }
          