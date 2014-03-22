var host = document.location.origin;
var socket = io.connect(host); 
socket.on('connect', function(data){
	socket.emit('remote');
	
	//Youtube
	  var Youtube = {
		  	getVideo: function(query, socket){
			  	var max_videos = 12;
			  	var url = "http://gdata.youtube.com/feeds/api/videos?vq=" + escape(query) + "&max-results=" + max_videos + "&alt=json-in-script&callback=?";
			  	
			  	$.getJSON(url, function(data){
				  	$("ul.video").html("");
				  	var jsonObj = [];
			  		$(data.feed.entry).each(function(key, item){
				  		var a = item.id.$t.split("/"),
				  			id = a[6],
				  			title = item.title.$t,
				  			thumbnail = item.media$group.media$thumbnail[0].url,
				  			totalSec = item.media$group.yt$duration.seconds,
				  			hours = parseInt( totalSec / 3600 ) % 24,
				  			minutes = parseInt( totalSec / 60 ) % 60,
				  			seconds = totalSec % 60;
				  		
				  		var duration = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
				  		
				  		
				  		jsonObj = {
					  		id:id,
					  		title:title,
					  		thumbnail:thumbnail,
					  		duration:duration};
					  		
				  		
				  		var template = $('#videoTpl').html(),
				  			html = Mustache.to_html(template, jsonObj);
				  		$('ul.video').append(html);	
				  			
			  		});
			  		$(".watch").on("click",function(){
  			  		var video_id = $(this).data('id');
					socket.emit('video',{action:"play", video_id:video_id});
			  		});
			  	});
			  		
		  	}
	  }		
	
$$(".r-container").swipeLeft(function(){
	socket.emit('controll',{action:"swipeLeft"}); 
});

$$(".r-container").swipeRight(function(){
	socket.emit('controll',{action:"swipeRight"}); 
});
$$(".r-header").tap(function(){
	socket.emit('controll',{action:"tap"}); 
	$(".app-body").fadeToggle("fast", function () {});	
	$.get(host+'/omx/quit',function(data){
		console.log(data);
	});
});
$$(".app-body").tap(function(){
	$.get(host+'/omx/pause',function(data){
		console.log(data);
	});
});
$(".search input").change(function() {
	Youtube.getVideo($(this).val(), socket);
 });
 
 socket.on("loading", function(data){
	 console.log(data);
 })	  
});