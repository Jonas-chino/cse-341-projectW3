const router = require('express').Router();
router.use('/', require('./swagger'));

router.get('/', (req , res) => {
    //res.send('hello world');});
    res.send('PROJECT API WEEK 3 and ');
})

router.use('/movies', require('./movies'));

router.use('/series', require('./series'));

module.exports = router;