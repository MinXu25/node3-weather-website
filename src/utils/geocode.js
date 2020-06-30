const request = require('request');

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibWluMjUiLCJhIjoiY2tiYm9ldjJwMDNhMzJ1bXozc2ZyZmp4eiJ9.UUoXfIBYPFFuk9n552WBCw&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Sorry, unable to connect to the mapbox api.');
        } else if (body.features.length === 0) {
            callback('No match found, please try another location.');
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;