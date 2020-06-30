const request = require('request');

const weather = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=73b763380504347f45ddc5ed470d0f8a&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Oops! Could not connect to the weatherstack api.');
        } else if (body.success === false) {
            callback('Invalid location, please try again!');
        } else {
            callback(undefined, body)
        }
    });
};

module.exports = weather;