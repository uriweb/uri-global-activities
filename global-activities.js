(function() {

	var map, mapbox, markers;
	mapbox = {
		id: null,
		token : 'pk.eyJ1IjoianBlbm55cGFja2VyIiwiYSI6ImNpeGs3NzZmMDAwMjUzM2xqZzQ1OXd4cmQifQ.BWgYC3LTTuBpnqito9pPrA'
	};
	markers = [];
	
	window.addEventListener('load', initMap, false);

	function initMap() {
		var corner1 = L.latLng(90, 180), corner2 = L.latLng(-90, -180), bounds = L.latLngBounds(corner1, corner2);
		
		map = L.map('map', {
			maxBounds: bounds
		}).setView([15, 0], 2);
		
		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=' + mapbox.token, {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18,
			id: mapbox.id,
			accessToken: mapbox.token,
		}).addTo(map);
								
		loadActivities();
	}

	function loadActivities() {
		loadJSON('https://www.uri.edu/communications/json/global-activities.json.js', addActivities);
	}

	function addActivities(data) {
		var m;
		for(x in data) {
			if(data[x].Lat) {
				//console.log(data[x]);
				m = L.marker([data[x].Lat, data[x].Lon]).addTo(map);
				m.bindPopup(createPopText(data[x])); //.openPopup();
				markers.push(m);
			}
		}
	}
	
	function createPopText(o) {
		var s = "";
		
		s += "<h6>" + o.ActivityTitle + "</h6><br>";
		s += '<span class="name">' + o.FirstName + " " + o.LastName + "</span><br>";
		s += '<span class="position">' + o.Title + "</span><br>";
		var c = (o.PrimaryCity) ? o.PrimaryCity + ', ' : '';
		s += '<span class="country">' + c + o.Country + "</span><br>";
		s += '<span class="description">' + o.ShortDesc + "</span>";
		
		return s;
	}

	function loadJSON(url, callback) {   
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
				// Required use of an anonymous callback as .open will NOT return a 
				// value but simply returns undefined in asynchronous mode
				callback(JSON.parse(xobj.responseText));
			} else {
				// @todo: add code for error condition
			}
		};
		xobj.send(null);  
	}

})();