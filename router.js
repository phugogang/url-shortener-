var express = require('express');
var router = express.Router();
var uuidV4 = require('uuid/V4');

var urlShort = require('./urlShortModels'); 


router.get('/', (req, res) => {
    res.render('index');
});


router.get('/:url', (req, res) => {
    console.log(req.params.url);
    urlShort.findOne({short_url: req.params.url})
            .then((data)=> {
                return res.redirect(data.original_url);
            })
            .catch((err) => {
                return res.json({'Error:': 'URL Not FOYUND!'})
            })
})


router.get('/new/:url*',  (req, res) => {  
    var url = req.originalUrl;
    var original_url = url.slice(5);
    
    urlShort.findOne({original_url})
            .then((data) => {
                if (data) {
                   return res.json({'original_url': data.original_url, 'short_url': data.short_url});                 
                }
            })                
            .then(() => {
                    generateShortURL(res, original_url);                       
                });               
});


function generateShortURL(res, original_url) {
     var short_url = uuidV4().split('-')[0];             
     var newUrl = new urlShort({ original_url, short_url });
     newUrl.save()                        
           .then(()=>{
              return res.json({'original_url': original_url, 'short_url': short_url});
            })  
}

module.exports = router;