var fs = require('fs'),
	path = require('path'),
	jsonFileName = "lat-long.json",
	logFilePath = path.join(__dirname, 'logs/apacheLogs.log'),
	jsonFilePath = path.join(__dirname, "json/" + jsonFileName),
	debugJsonFilePath = path.join(__dirname, "json/" + jsonFileName.replace(".", ".debug."))
	CronJob = require('cron').CronJob

;

/* Cron job cruft */
function parseLogFile() {
	var rfindIp = /(?:[0-9]{1,3}\.){3}[0-9]{1,3}/g,
		rfindLatLong = /json\/\?address=[^\s]{0,}/g

	;

	fs.readFile(logFilePath, {encoding: 'utf-8'}, function(err,data){
		if (err) {
			console.log(err);
			return;
		}

		var lat_long = data.match(rfindLatLong),
			rawData

		;

		if(!lat_long) {
			return;
		}

		rawData = lat_long.map(function(v, i) {
			var lat_long = v.slice( v.lastIndexOf("=") + 1 ).split(",");

			return {
				"lat": lat_long[0],
				"lng": lat_long[1]
			};
		});

		createJsonFile(rawData);
	});
}

function createJsonFile(rawData) {
	var json = JSON.stringify( rawData ),
		debugJson = JSON.stringify( rawData, null, "\t")

	;

	fs.writeFile(jsonFilePath, json, function (err) {
		if (err) {
			return console.log(err);
		}
	});

	fs.writeFile(debugJsonFilePath, debugJson, function (err) {
		if (err) {
			return console.log(err);
		}
	});
}

new CronJob('* * * * * *', function() {
	parseLogFile();
}, null, true, 'America/Los_Angeles');