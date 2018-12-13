const request = require('request');

var checkItem = (item, checkAddress) => {
	if (typeof item === "string") {
	  checkAddress = checkAddress.push(item);
	}
  };
  
var geocodeAddress = (address, callback) => {
	var encodeAddress = encodeURIComponent(address);

	request({
		//fixed version
		url:`https://geocode.xyz/${encodeAddress}?json=1`,
		//basic google api
		//url:`http://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=AIzaSyAYnbV5lqeyt_FJrynkFSwWfZ9l172kdDc`,
		//old solution
		//url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301+lombard+st+philadelphia&key=AIzaSyDxzSbaQdU4b5gzdcUk4WnO0UfJ6toiuNI',
		//MapQuest version
		//url: `http://www.mapquestapi.com/geocoding/v1/address?key=gtLGNMuP1PffDgEcksnDDoae8k0pCR4N&location=${encodeAddress}`,
		json: true
	}, (error, response, body) => {
		if (body.error) {
			callback(`${body.error.description}`)
		} else {
			// var lat = body.results[0].locations[0].latLng.lat;
			// var lng = body.results[0].locations[0].latLng.lng;
			var lat = body.latt;
			var lng = body.longt;
			var checkAddress = new Array();
			checkItem(body.standard.stnumber, checkAddress);
			checkItem(body.standard.addresst, checkAddress);
			checkItem(body.standard.city, checkAddress);
			checkItem(body.standard.postal, checkAddress);
			checkItem(body.standard.state, checkAddress);
			checkItem(body.standard.countryname, checkAddress);
			var formattedAddress = checkAddress.map(x => " " + x);
			callback(undefined, {
				// address: body.results[0].providedLocation.location,
				// latitude: body.results[0].locations[0].latLng.lat,
				// longtitude: body.results[0].locations[0].latLng.lng
				address: formattedAddress.toString(),
				latitude: body.latt,
				longtitude: body.longt
			})
		}
	});
}

module.exports =  {
	geocodeAddress
};

