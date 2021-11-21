var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt');
var uid2 = require('uid2');

var userModel = require('../models/users')


router.post('/sign-up', async function(req,res,next){

  var error = []
  var result = false
  var saveUser = null

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if(data != null){
    error.push('utilisateur déjà présent')
  }

  if(req.body.usernameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }


  if(error.length == 0){
    const hash = bcrypt.hashSync(req.body.passwordFromFront, 10);
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hash,
      token: uid2(32)
    })
  
    saveUser = await newUser.save()
  
    
    if(saveUser){
      result = true
    }
  }
  
  res.json({result, saveUser, error})
})

router.post('/sign-in', async function(req,res,next){

  var result = false
  var user = null
  var error = []
  
  
  if(req.body.emailFromFront == '' || req.body.passwordFromFront == ''){
    error.push('champs vides')
  }

  if(error.length == 0){
     user = await userModel.findOne({
      email: req.body.emailFromFront,
    })
  var password = req.body.passwordFromFront
 
    
  if (bcrypt.compareSync(password, user.password)) {
     
     result = true
     } else {
      error.push('mot de passe incorrect')
     }
    } 
  

  res.json({result, user, error})


})

module.exports = router;
