const request = require("request");

var getWeather = (lat, lng) => {
    request({
        url: `https://api.darksky.net/forecast/2c6a6ef6e4404d43827ec273744d8040/${lat},${lng}`,
        json: true
    },(error, response, body) => {
        if(!error && response.statusCode === 200) {
            var c = (body.currently.temperature-32)/1.8
            console.log(`It's currently ${body.currently.temperature}F (${c}C).` );
        } else {
            console.log('Unable to fetch weather.');
        }
    });
    
};


module.exports = {
    getWeather
  };