const express = require('express');
const userModel = require('../models/User');
const app = express();

//Read ALL
//http://localhost:8081/users
app.get('/users', async (req, res) => {
  //const users = await userModel.find({});
  //Sorting
  //use "asc", "desc", "ascending", "descending", 1, or -1
  //const users = await userModel.find({}).sort({'firstname': -1});

  //Select Specific Column
  const users = await userModel.find({})
              //.select("firstname lastname salary")
              //.sort({'salary' : 'desc'});

  try {
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//http://localhost:8081/user
app.post('/user', async (req, res) => {

    const user = new userModel(req.body);

    try {
      await user.save((err) => {
        if(err){
          //Custome error handling
          //console.log(err.errors['name'].message)
          //console.log(err.errors['lastname'].message)
          //console.log(err.errors['gender'].message)
          //console.log(err.errors['salary'].message)
          res.send(err)
        }else{
          res.send(user);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = app
