var s = $('#bgvideo')[0];
var b = $('#video-btn');
var s = $('#video-stu');
this.controls = true; //控制条
var current = true  
b.addEventListener("click",function() {
	if(current){
		b.addClass('video-pause').removeClass('video-play').show()
		s.css({'bottom': '-100px'})
		$('.content-home').css({'top': '-999px'})
		$('#banner_wave_1').addClass('banner_wave_hide')
        $('#banner_wave_2').addClass('banner_wave_hide')
        $('#video-add').show()
        b.addClass('videolive')
        b.addClass('haslive')
		video.play();
		current = false  //下次点击的状态
	}else{
		b.addClass('video-play').removeClass('video-pause')
		$('.content-home').css({'top': '49.3%'})
		$('#banner_wave_1').removeClass('banner_wave_hide')
		$('#banner_wave_2').removeClass('banner_wave_hide')
		s.css({'bottom': '0px'}).html('已暂停 ...')
		video.pause()
		current = true;
	}
})