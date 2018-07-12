const moment = require('moment');
const axios = require('axios');

// const getTodaysRates = () => {
//   const today = moment(new Date).format('YYYY-MM-DD');
//   const apiKey = process.env.CURRENCY_LAYER_API_KEY;
//   const USD_rates = `http://apilayer.net/api/live?access_key=${apiKey}&currencies=AUD,GBP,EUR,JPY,THB,VND,PHP&source=USD&format=1`;
//   axios.get(USD_rates)
//     .then(res => {
//       return res.data
//     })
//     .catch(err => console.log(err));
// }


//TODO: Figure out how the hell to do promises


// const getTodaysRates = new Promise(function (resolve, reject) {
//   const today = moment(new Date).format("YYYY-MM-DD");
//   const apiKey = process.env.CURRENCY_LAYER_API_KEY;
//   const USD_rates = `http://apilayer.net/api/live?access_key=${apiKey}&currencies=AUD,GBP,EUR,JPY,THB,VND,PHP&source=USD&format=1`;
//   let rates = null;
//   axios.get(USD_rates)
//     .then(res => {
//       rates = res.data
//     })
//     .catch(err => console.log(err))

//   if (rates !== null) {
//     resolve(rates)
//   } else {
//     const error = new Error('Sorry, could not get rates');
//     reject(error)
//   }
// })

// module.exports = getTodaysRates;