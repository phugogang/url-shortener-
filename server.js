var express = require('express');
var app = express();
var mongoose = require('mongoose');
var urlRouter = require('./router');
var path = require('path');


var urlDataDB = 'mongodb://anhphu:anhmaiyeuem1995@ds149201.mlab.com:49201/shorturlnap';

mongoose.connect(urlDataDB, ()=>{
    console.log('Connected Database!')
});



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', urlRouter);


app.listen(process.env.PORT | 8000, () => {
    console.log('App is listening on' + process.env.PORT | 8000 );
})