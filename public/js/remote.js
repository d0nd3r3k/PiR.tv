var host = document.location.origin;
var socket = io.connect(host);
socket.on('connect', function(data){
	socket.emit('remote');

	//Youtube
	var Youtube = {
		getVideo: function(query, socket){
			var apiKey = "{YOUR API KEY HERE}"
			var max_videos = 25;
			var url = "https://www.googleapis.com/youtube/v3/search?order=viewcount&part=snippet&q=" + escape(query) + "&type=video+&videoDefinition=high&key=" + apiKey + "&maxResults="+ max_videos;

			$.getJSON(url, function(json){
				$("ul.video").html("");
				var jsonObj = [];
				$(json.items).each(function(key, item){
					console.log(item.id.videoId+" "+item.snippet.title+" "+item.snippet.thumbnails.default.url);
					jsonObj = {
						id: item.id.videoId,
						title: item.snippet.title,
						thumbnail: item.snippet.thumbnails.medium.url,
						description: item.snippet.description
					};


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
