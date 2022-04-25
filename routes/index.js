var express = require('express');
const passport = require('passport');
var router = express.Router();
const userschema = require('../Schema/UserSchema')

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });


//user register
router.post('/userregister', async (req, res, next) => {

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
    console.log("error");
    console.error(error);
  }
})

//user login
router.post('/userlogin', async (req, res, next) => {

  try {

    //validate the creditionals
    passport.authenticate("local", (err, user, info) => {
      if (err)
        console.log(err.message);
      if (!user) res.send(info.message);
      else //logIn into their user
        req.logIn(user, (err) => {
          if (err)
            console.log(error.message);
          else
            res.json({
              message: "Success"
            })
        })

    })(req, res, next);


  } catch (error) {
    console.error(error.message);
  }
})

module.exports = router;
