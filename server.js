const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/UserRoutes.js');

const app = express();
app.use(express.json()); // Make sure it comes back as json

mongoose.connect('mongodb+srv://polosataya-koza:Ekiseleva2020@cluster0.f0kbr.azure.mongodb.net/mydb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database mongoDB Atlas Server.");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});

app.use(userRouter);

app.get('/', (req, res) => {
  res.send("<h1>Welcome to Week 05 Exercise</h1>");
});

app.listen(8081, () => { console.log('Server is listening on port 8081') });
