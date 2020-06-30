const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/weatherstack');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectorPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectorPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather app",
        name: "min xu"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'this is about',
        name: "min xu"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the help page!',
        name: "min xu"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "help article",
        name: "min xu",
        errorMessage: "Sorry, article not found!"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'No address was provided!'
        });
    }

    geocode(req.query.location, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({
                error: err
            });
        }

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                })
            }

            res.send({
                result: forecastData
            })
        });
    });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "404!",
        name: "min xu",
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log(`Server started listening on port ${port}`);
});