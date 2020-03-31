const mongoose = require("mongoose");
const passport   = require('passport');
const bcrypt     = require('bcryptjs');
const User = require("../models/User-model");


 exports.create = (req, res) => {
  
      const username = req.body.user;
      const  password = req.body.password;



            if (!username || !password) {
              res.status(400).json({ message: 'Provide username and password' });
              return;
            }

            if( password.length < 7){
              res.status(400).json({ message: "please make your passwrod at least 8 characters"});
              return;
            }

            User.findOne({ username }, (err, foundUser) => {
              
              if(err){
                res.status(500).json({message: "Username check went bad."});
                return;
              }
              if (foundUser) {
                res.status(400).json({ message: 'Username taken. Choose another one.' });
                return;
              }

              const salt = bcrypt.genSaltSync(10);
              const hashPass = bcrypt.hashSync(password, salt);

              const aNewUser = new User({
                  username: username,
                  password: hashPass,
                  phone: req.body.phone,
                  email: req.body.email,
                  rol: req.body.rol,
                  birthday: req.body.birthday,
                  gender: req.body.gender,
                  
              });

              aNewUser.save(err => {
                if(err) {
                  res.status(400).json({ message: 'Saving user to database went wrong.' });
                  return;
                }
                // Automatically log in user after sign up
                req.login(aNewUser, (err) => {

                  if (err) {
                      res.status(500).json({ message: 'Login after signup went bad.' });
                      return;
                  }
              
                  // Send the user's information to the frontend
                  // We can use also: res.status(200).json(req.user);
                  res.status(200).json(aNewUser);

                });
               });
       });
  }