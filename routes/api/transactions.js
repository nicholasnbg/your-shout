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
  (req, res) => {}
);

module.exports = router;