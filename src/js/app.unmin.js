(function(window, $, undefined) {
	var app = {
			map: null,
			mapId: "map",
			cfg: {
				// radius should be small ONLY if scaleRadius is true (or small radius is intended)
				"radius": 2,
				"maxOpacity": 0.8,
				// scales the radius based on map zoom
				"scaleRadius": true,
				// if set to false the heatmap uses the global maximum for colorization
				// if activated: uses the data maximum within the current map boundaries
				//   (there will always be a red spot with useLocalExtremas true)
				"useLocalExtrema": true,
				// which field name in your data represents the latitude - default "lat"
				latField: 'lat',
				// which field name in your data represents the longitude - default "lng"
				lngField: 'lng',
				// which field name in your data represents the data value - default "value"
				valueField: 'count'
			},
			origHeatMapLayer: null,
			modHeatLayer: null
		},
		$zip = $("#zip"),
		$search = $("#search")

	;

	function errorHandler() {
		console.dir(arguments);
		// debugger;
	}

	function getJson() {
		return $.ajax({
			url: "/node/express/json/lat-long.json"
		});
	}

	function getLatLong( url ) {
		return $.ajax({
			url: url
		});
	}

	function resetMap( data ) {
		var results = data.results[0].geometry.location;

		app.map.setView(L.latLng(results.lat, results.lng), 10);
		app.origHeatMapLayer.cfg.radius = 0.2;
    	app.origHeatMapLayer._update();
		// console.dir(arguments);
		// debugger;
	}

	function createViz( json ) {
		$(document).ready(function(){
		// upon loading of webpage, run
		    var testData = {
		        max: 8,
		        data: json
		    };

		    // Layer for base map
		    var baseLayer = L.tileLayer(
		        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		        maxZoom: 18
		    });

		    app.origHeatMapLayer = new HeatmapOverlay(app.cfg);

		    // Leaflet map object
		    app.map = new L.Map(app.mapId, {
		        center: new L.LatLng(40.8106, -96.6879),
		        zoom: 4,
		        layers: [baseLayer, app.origHeatMapLayer]
		    });

		    // place data on map
		    app.origHeatMapLayer.setData(testData);

		    // make accessible for debugging
		    // layer = heatmapLayer;

		    // Set the map to zoom in on location
		    // map.setView(L.latLng(34.239188, -118.549207),8);
		});
	}

	getJson().then(createViz, errorHandler);

	// Event handlers
	$zip.on("keyup", function( event ) {
		// Enter key pressed.
		if( event.which === 13 ) {
			$search.click();
		}
	});

	$search.on("click", function(event) {
		event.preventDefault();

		var value = decodeURIComponent($zip.val()),
			latLongUrl = "http://maps.googleapis.com/maps/api/geocode/json?address=" + value
			// latLongUrl = "http://dev.virtualearth.net/REST/v1/Locations/US/adminDistrict/locality/addressLine?postalCode={0}&key=AnnArQwNIgUpJT2pwG-r8eNlG9bD1s80u6l4vk-Ar24jRnh_bQO25Mv_5gSb8t3v".replace("{0}", value)

		;

		getLatLong(latLongUrl).then(resetMap, errorHandler);
	});

	window.app = app;
}(window, jQuery));