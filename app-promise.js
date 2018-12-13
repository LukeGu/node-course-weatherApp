const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a:{
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;
var encodeAddress = encodeURIComponent(argv.address);

var geocodeURL = `https://geocode.xyz/${encodeAddress}?json=1`;

//console.log(geocodeURL);

axios.get(geocodeURL).then((response) => {
	if(response.data.error) {
		throw new Error(`${response.data.error.description}`);
	}
	var lat = response.data.latt;
	var lng = response.data.longt;
	var weatherURL = `https://api.darksky.net/forecast/2c6a6ef6e4404d43827ec273744d8040/${lat},${lng}`;
	console.log(`${response.data.standard.city} ${response.data.standard.countryname}`);
	return axios.get(weatherURL);
}).then((response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(`It's currently ${temperature} degree. It feels like ${apparentTemperature} degree.`);
}).catch((e) => {
	if (e.code === 'ENOTFOUND') {
		console.log('Unable to connect to API servers.');
	} else {
		console.log(e.message);
	}
});