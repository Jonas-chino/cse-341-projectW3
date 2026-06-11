const router = require('express').Router();
const passport = require('passport');
router.use('/', require('./swagger'));

// router.get('/', (req , res) => {
//     //res.send('hello world');});
//     res.send('welcome to API project 3 and 4 ');
// })



router.get('/login', passport.authenticate('github'), (req, res) => {});


router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.use('/movies', require('./movies'));

router.use('/series', require('./series'));

module.exports = router;