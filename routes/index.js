const router = require('express').Router();
router.use('/', require('./swagger'));

router.get('/', (req , res) => {
    //res.send('hello world');});
    res.send('welcome to API project 3 and 4 ');
})

router.use('/movies', require('./movies'));

router.use('/series', require('./series'));

module.exports = router;