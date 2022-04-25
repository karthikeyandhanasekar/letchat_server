var express = require('express');
var router = express.Router();
const userschema = require('../Schema/UserSchema')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/userlogin', async (req, res, next) => {

  try {

    userschema.register(new userschema({ username: req.body.username, email: req.body.email }), req.body.password, (err, data) => {
      if (err)
        console.log(err.message);
      else
        res.json({
          message: "Success"
        })
    })

  } catch (error) {
    console.error(error.message);
  }
})

module.exports = router;
