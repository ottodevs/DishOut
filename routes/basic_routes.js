var express = require('express')
var router = express.Router()
var users = require("../db/users")

module.exports = function (app, passport) {
// Signup
  router.post('/signup', function(req, res){
    console.log('### POST /signup', req.body)

  //   users.createUser({
  //       "name": req.body.name,
  //       "email": req.body.email,
  //       "password": req.body.password
  //     },
  //     (err, userId) => {
  //       if (err) {
  //         console.log("Failed signup", err)
  //         res.send('Failed signup')
  //         return
  //       }
  //       console.log("successful signup", userId)
  //       req.session.userId = userId
  //       res.redirect('/user/' + req.session.userId)
  //     })
  // })

  app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        // failureFlash : true // allow flash messages
    }));

  app.use('/', router)

}

// Homepage
router.get('/', function(req, res){
  console.log("### GET '/'")

  res.render('index')
})

// Login
router.post('/login', function(req, res){
  console.log('### POST /login')

  users.login(
    req.body.email,
    req.body.password,
    (err, data) => {
      if (err) {
        console.log("Failed to login", err)
        res.send('Failed login')
        return
      }
      console.log("Successful login")
      req.session.userId = data.id
      res.redirect('/user/' + data.id)
    })
})

// Logout
router.get("/logout",function(req,res){
  console.log('### GET /logout')

  req.session.destroy()
  res.redirect("/")
})


