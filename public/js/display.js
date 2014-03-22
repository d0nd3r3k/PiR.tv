var host = document.location.origin;
var socket = io.connect(host);
socket.on('connect', function(data){
socket.emit('screen');
});

socket.on('controlling', function(data){
  var current = $(".selected");
  
  if(data.action === "goLeft"){
	  
	  $(".selected").removeClass("selected");
	  
	  if($(current).prev().attr("id") === "start-block"){
		$("#end-block").prev().addClass("selected");  
	  } else{
		$(current).prev().addClass("selected");	  
	  }
	  
  }
  else if(data.action === "goRight"){
	  
		$(".selected").removeClass("selected");
		
		if($(current).next().attr("id") === "end-block"){
		  	$("#start-block").next().addClass("selected");  
		} else{
		  	$(current).next().addClass("selected");	  
		}
	  
  }
  else if(data.action === "enter"){
	  
  }
})