const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Load Validation
const validateGroupInput = require('../../validation/group')

//Load group Schema
const Group = require('../../models/Group');
const User = require('../../models/User');

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

//@route        POST api/groups/:groupid/adduser/:userid
//@desc         Add a user to a group
//@acess        Private
router.post('/:groupid/adduser/:userid', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Group.findById({
      _id: req.params.groupid
    })
    .then(group => {
      // Check that user is in group and admin
      const isMemberAndAdmin = group.members.filter(member => {
        return member.user === req.user.id && member.admin
      }).length > 0;
      //Add user to group members array
      if (isMemberAndAdmin) {
        //Bring up user info
        User.findById({
            _id: req.params.userid
          })
          .then(user => {
            const newUser = {
              user: user._id,
              admin: false,
              avatar: user.avatar
            };
            group.members.unshift(newUser);

            group.save().then(group => res.json(group))
          })
      } else {
        return res.status(400).json({
          err: 'Sorry, you are not authorized to add user'
        })
      }
    })
})

//@route        DELETE api/groups/:groupid/removeuser/:userid
//@desc         Remove a user from a group
//@acess        Private
router.delete('/:groupid/adduser/:userid', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Group.findById({
      _id: req.params.groupid
    })
    .then(group => {
      // Check that user is in group and admin
      const isMemberAndAdmin = group.members.filter(member => {
        return member.user === req.user.id && member.admin
      }).length > 0;
      //Add user to group members array
      if (isMemberAndAdmin) {
        // Check that user to be removed is in group
        const isInGroup = group.members.filter(member => member.user === req.params.userid).length > 0;
        if (isInGroup) {
          // Get remove index
          const removeIndex = group.members.map(member => member.user).indexOf(req.params.userid);

          // Splice user from members array
          group.members.splice(removeIndex, 1);

          group.save().then(group => res.json(group));
        } else {
          return res.status(400).json({
            err: 'The user is not in this group'
          })
        }
      } else {
        return res.status(400).json({
          err: 'Sorry, you are not authorized to add user'
        })
      }
    })
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