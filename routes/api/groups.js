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


//@route        DELETE api/groups/:id
//@desc         Delete a group
//@acess        Private
router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Group.findById({
    _id: req.params.id
  }).then(group => {
    // Check if logged in user is member of group
    const isMember = group.members.filter(member => {
      return member.user === req.user.id
    }).length > 0;
    if (isMember) {
      const member = group.members.filter(member => {
        return member.user === req.user.id
      })
      const isAdmin = member[0].admin;
      if (isAdmin) {
        Group.findByIdAndRemove({
          _id: req.params.id
        }).then(() =>
          res.json({
            success: true
          })
        )
      } else {
        return res.status(400).json({
          err: 'Sorry, you cannot delete this group'
        })
      }
    } else {
      return res.status(400).json({
        err: 'Sorry, you cannot delete this group'
      })
    }
  })
})

module.exports = router;