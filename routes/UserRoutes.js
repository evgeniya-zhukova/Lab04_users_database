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

//Some more test queries
//http://localhost:8081/users/test
app.get('/users/test', async (req, res) => {
  try {
    const users = userModel.
                        find({})
                        //.where('lastname').equals('patel')
                        //.where('salary').gte(1000.00).lte(10000.00)
                        //.where('firstname').in(['pritesh', 'moksh'])
                        //.limit(10)
                        //.sort('-salary')
                        //.select('firstname lastname salary')
                        .exec((err, data) => {
                          if (err){
                              res.send(JSON.stringify({status:false, message: "No data found"}));
                          }else{
                              res.send(data);
                          }
                        });
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
          //console.log(err.errors['firstname'].message)
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
