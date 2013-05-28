
$(document).ready(function(){
	Weather.init();
	Clock.start();
	$(".logo").html($("#rpi-svg").html());
	
});
var Loader = {
  loader: $('#loader'),
  show: function() {
	this.loader.siblings('div').hide();
	this.loader.show();
  },
  hide: function() {
	  this.loader.siblings('div').show();
	this.loader.hide();
  }
};
var Weather = {
	init: function(){
		this.getWeather('c9d417b22edc92cf','LB','Beirut');
	},
	getWeather: function(key, country, city){
		var that = this;
		Loader.show();
		var url = "http://api.wunderground.com/api/"+key+"/forecast10day/q/"+country+"/"+city+".json?callback=?";
		$.getJSON(url, function(data){
			Loader.hide();
			var forecastObj = [];
			var forecast = data.forecast.simpleforecast.forecastday;
			$(forecast).each(function(key, value){
				if(key < 7){
				forecastObj = {
					"day":value.date.weekday,
					"low":value.low.celsius, 
					"high":value.high.celsius,
					"icon":that.condition(value.icon_url)};	
				
					var template = $('#weatherTpl').html(),
					    html = Mustache.to_html(template, forecastObj);
					$('ul.weather').append(html);		
					}
			});	
		});	
		
	},
	condition: function (url){
		var matcher = /\/(\w+).gif$/;
		var code = matcher.exec(url);
		if (code) {
		  code = code[1];
		} else {
		  // We can't find the code
		  code = null;
		}
		switch(code) {
	
		  case "chanceflurries":
		  case "chancesnow":
			return "p";
	
		  case "/ig/images/weather/flurries.gif":
			return "]";
	
		  case "chancesleet":
			return "4";
	
		  case "chancerain":
			return "7";
	
		  case "chancetstorms":
			return "x";
	
		  case "tstorms":
		  case "nt_tstorms":
			return "z";
	
		  case "clear":
		  case "sunny":
			return "v";
	
		  case "cloudy":
			return "`";
	
		  case "flurries":
		  case "nt_flurries":
			return "]";
	
		  case "fog":
		  case "hazy":
		  case "nt_fog":
		  case "nt_hazy":
			return "g";
	
		  case "mostlycloudy":
		  case "partlysunny":
		  case "partlycloudy":
		  case "mostlysunny":
			return "1";
	
		  case "sleet":
		  case "nt_sleet":
			return "3";
	
		  case "rain":
		  case "nt_rain":
			return "6";
	
		  case "snow":
		  case "nt_snow":
			return "o";
	
		  // Night Specific
	
		  case "nt_chanceflurries":
			return "a";
	
		  case "nt_chancerain":
			return "8";
	
		  case "nt_chancesleet":
			return "5";
	
		  case "nt_chancesnow":
			return "[";
	
		  case "nt_chancetstorms":
			return "c";
	
		  case "nt_clear":
		  case "nt_sunny":
			return "/";
	
		  case "nt_cloudy":
			return "2";
	
		  case "nt_mostlycloudy":
		  case "nt_partlysunny":
		  case "nt_partlycloudy":
		  case "nt_mostlysunny":
			return "2";
	
	
		  default:
			console.log("MISSING", code);
			_gaq.push(['_trackEvent', 'unknowweather', code]);
			return "T";
		}
	  }
}

var Clock = {
  $el : {
	digital : {
	  time : $('#time'),
	  date : $('#date')
	}
  },

  weekdays : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
  months : ["January","February","March","April","May","June","July","August","September","October","November","December"],

  timeParts: function() {
	var date = new Date(),
		hour = date.getHours();
		hour = 12;
	
	return {
	  // Digital
	  day: Clock.weekdays[date.getDay()],
	  date: date.getDate(),
	  month: Clock.months[date.getMonth()],
	  hour: Clock.appendZero(hour),
	  minute: Clock.appendZero(date.getMinutes()),
	  second: Clock.appendZero(date.getSeconds()),
	};
  },

  appendZero : function(num) {
	if(num < 10) {
	  return "0" + num;
	}
	return num;
  },

  refresh: function() {
	var parts = Clock.timeParts(12);
	Clock.$el.digital.date.html(parts.day + ', ' + parts.month + ' ' + parts.date);
	Clock.$el.digital.time.html("<span class='hour'>"+parts.hour+"</span> : "+"<span class='minute'>"+parts.minute+"</span>"+" : <span class='second'>"+parts.second+"</span");
  },

  start: function() {
	if (Clock._running) {
	  clearInterval(Clock._running);
	}

	Clock._running = setInterval(function() {
	  Clock.refresh();
	}, 1000);
	Clock.refresh();
  }
};
