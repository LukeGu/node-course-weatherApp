const request = require('request');

var geocodeAddress = (address) => {
	return new Promise((resolve, reject) => {
		var encodeAddress = encodeURIComponent(address);

		request({
			//basic google api
			url:`http://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`,
			//old solution
			//url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+st+philadelphia&key=AIzaSyDxzSbaQdU4b5gzdcUk4WnO0UfJ6toiuNI',
			//MapQuest version
			//url: 'http://www.mapquestapi.com/geocoding/v1/address?key=gtLGNMuP1PffDgEcksnDDoae8k0pCR4N&location=1301%20lombard%20street%20philadelphia',
			json: true
		}, (error, response, body) => {
			if (error) {
				reject('Unable to connect to Google servers.')
			} else if (body.status ==='ZERO_RESULTS') {
				reject('Unable to find that address.')
			}else if (body.status ==='OK') {
				resolve({
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longtitude: body.results[0].geometry.location.lng
				})
			}
		});
	});	
};

geocodeAddress('19146').then((location) => {
		console.log(JSON.stringify(location, undefined,2));
	}, (errorMessage) => {
		console.log(errorMessage);
});