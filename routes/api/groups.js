const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Load Validation
const validateGroupInput = require('../../validation/group')

//Load group Schema
const Group = require('../../models/Group');

//@route        GET api/groups/test
//@desc         Tests posts route
//@access        public route
router.get('/test', (req, res) => res.json({
  msg: 'Groups works'
}));

//@route        POST api/groups
//@desc         Create new group
//@acess        Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    errors,
    isValid
  } = validateGroupInput(req.body)

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors)
  } else {
    const newGroup = new Group({
      name: req.body.name,
      members: [{
        user: req.user.id,
        admin: true,
        avatar: req.user.avatar
      }]
    })

    newGroup.save().then(group => res.json(group))
  }
})


module.exports = router;