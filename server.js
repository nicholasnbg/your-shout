const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport');
const dotenv = require('dotenv');

const users = require('./routes/api/users');
const groups = require('./routes/api/groups');
const transactions = require('./routes/api/transactions');
const rates = require('./routes/api/rates');

const app = express();

dotenv.config();

//Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// DB config
const db = process.env.DB_URI;

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
app.use('/api/rates', rates);

//Set Port
const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});