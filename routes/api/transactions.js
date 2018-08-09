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
        const transaction = req.body;

        // THIS IS THE FORMAT OF A TRANSACTION
        // const transaction = {
        //   users: [{
        //     userid: "5b457798bd42b63740a0e849",
        //     amount: 20
        //   }],
        //   date: "2018-07-15",
        //   description: "This is a test"
        // };
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

//@route        DELETE api/transactions/:groupid/:transactionid
//@desc         Delete a transaction
//@acess        Private and admin only
router.delete('/:groupid/:transcationid', passport.authenticate("jwt", {
  session: false
}), (req, res) => {
  Group.findById({
      _id: req.params.groupid
    })
    .then(group => {
      // Check that user is in group and admin
      const isMemberAndAdmin = group.members.filter(member => {
        return member.user.toString() === req.user.id && member.admin
      }).length > 0;
      if (isMemberAndAdmin) {
        const removeIndex = group.transactions.map(transaction => transaction._id).indexOf(req.params.transactionid);
        group.transactions.splice(removeIndex, 1);
        group.save().then(group => res.json(group))
      } else {
        return res.status(400).json({
          msg: 'Sorry, you can not perform this action'
        })
      }

    })
})



module.exports = router;