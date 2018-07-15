const express = require("express");
const router = express.Router();
const passport = require("passport");


//Load Schemas
const Group = require("../../models/Group");

router.get("/test", (req, res) => {
  const rates = getTodaysRates();
  return res.json(rates);
});

//@route        POST api/transactions/:groupid
//@desc         Create a new transaction
//@acess        Private
router.post(
  "/:groupid",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    //TODO: figure out how to validate this
    Group.findById({
        _id: req.params.groupid
      })
      .then(group => {
        // const transaction = req.body.transaction;
        const transaction = {
          users: [{
            userid: "5b457798bd42b63740a0e849",
            amount: 20
          }],
          date: "2018-07-15",
          description: "This is a test"
        };
        console.log(transaction)
        group.transactions.unshift(transaction);
        //update each members balance
        transaction.users.forEach(user => {
          const memberIndex = group.members.map(member => member.user.toString()).indexOf(user.userid.toString());
          group.members[memberIndex].balance += user.amount;
        })
        group.save().then(group => res.json(group));
      })
      .catch(err => res.status(400).json('Error' + err))
  }
);

module.exports = router;