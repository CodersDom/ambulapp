var express = require('express')
var router = express.Router();


router.get('/',function (req,res,next) {
    res.send('Welcome To Ambulapp');
    console.log('lol')
});

module.exports = router;