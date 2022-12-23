const express = require('express')
const mongodb = require('./database/mongodb')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

// Setup static File Location
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('layouts')
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))