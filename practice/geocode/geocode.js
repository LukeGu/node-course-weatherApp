const request = require("request");
const weather = require('../weather/weather');

var checkItem = (item, checkAddress) => {
  if (typeof item === "string") {
    checkAddress = checkAddress.push(item);
  }
};

var geocodeAddress = address => {
  const encodeAddress = encodeURIComponent(address);
  request(
    {
      url: `https://geocode.xyz/${encodeAddress}?json=1`,
      json: true
    },
    (error, response, body) => {
      if (body.error) {
        console.log(`${body.error.description}`);
      } else {
        var checkAddress = new Array();
        checkItem(body.standard.stnumber, checkAddress);
        checkItem(body.standard.addresst, checkAddress);
        checkItem(body.standard.city, checkAddress);
        checkItem(body.standard.postal, checkAddress);
        checkItem(body.standard.state, checkAddress);
        checkItem(body.standard.countryname, checkAddress);
        //console.log(`Address: ${body.standard.stnumber} ${body.standard.addresst} ${body.standard.city} ${body.standard.postal} ${body.standard.state} ${body.standard.countryname}`);
        var formattedAddress = checkAddress.map(x => " " + x);
        console.log(`Address:${formattedAddress}`);
        // console.log(`latitude: ${body.latt}`);
        // console.log(`longitude: ${body.longt}`);
        weather.getWeather(body.latt, body.longt);
      }
    }
  );
};

module.exports = {
  geocodeAddress
};
