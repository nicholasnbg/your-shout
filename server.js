const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport')

const users = require('./routes/api/users');
const groups = require('./routes/api/groups');
const transactions = require('./routes/api/transactions');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log('mongoDB connected'))
  .catch((err) => console.log(err))

// Passport Middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/groups', groups);
app.use('/api/transactions', transactions);

//Set Port
const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});