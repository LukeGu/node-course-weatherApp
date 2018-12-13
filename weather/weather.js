const request = require('request');

var getWeather = (lat, lng, callback) => {
	//temp----------------------
	request({
		url: `https://api.darksky.net/forecast/2c6a6ef6e4404d43827ec273744d8040/${lat},${lng}`,
		json: true
		}, (error, response, body) => {
			if(!error && response.statusCode === 200){
				callback(undefined, {
					Temperatrue: body.currently.temperature,
					apparentTemperatrue: body.currently.apparentTemperature
				});
			} else {
				callback('Unable to fetch weather.');
			}
	});
	//------------------------------
};

module.exports =  {
	getWeather
};
