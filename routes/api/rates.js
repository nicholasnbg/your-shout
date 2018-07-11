const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const moment = require('moment');
const axios = require('axios');

const Rates = require('../../models/Rates');

const getTodaysRates = require('../../helpers/currency');

const today = moment(new Date).format('YYYY-MM-DD');


router.post('/getrates', (req, res) => {

  Rates.findOne({
    date: today
  }).then((date) => {
    if (date) {
      return res.status(400).json({
        err: "Rates for today already downloaded"
      })
    } else {
      // const rates = getTodaysRates();
      const apiKey = process.env.CURRENCY_LAYER_API_KEY;

      const USD_rates = `http://apilayer.net/api/live?access_key=${apiKey}&currencies=AUD,GBP,EUR,JPY,THB,VND,PHP&source=USD&format=1`;
      axios.get(USD_rates)
        .then(res => {
          const newRates = new Rates({
            date: today,
            data: res.data
          })
          newRates.save().then(console.log('success'))
        })
        .catch(err => console.log(err));
    }
    return res.json({
      msg: 'Rates added'
    })
  })
})



module.exports = router;