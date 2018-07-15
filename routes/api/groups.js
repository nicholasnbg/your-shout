const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

// Load Validation
const validateGroupInput = require('../../validation/group')

//Load Schemas
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
    // Check that user is not in group with same name
    User.findById({
        _id: req.user.id
      })
      .then(user => {
        // see if user in any groups with same group name as new group
        const uniqueGroup = user.groups.map(userGroup => userGroup.name).filter(name => name === req.body.name).length === 0;
        if (!uniqueGroup) {
          errors.name = 'Sorry, you are already in a group with that name';
          return res.status(400).json(errors)
        } else {
          // Create new group
          const newGroup = new Group({
            name: req.body.name,
            members: [{
              user: req.user.id,
              admin: true,
              avatar: req.user.avatar,
              balance: 0
            }],
            transactions: []
          })
          newGroup.save().then(group => {
            // Add group to admin users groups
            User.findById({
                _id: req.user.id
              })
              .then(user => {
                const newUserGroup = {
                  group,
                  name: group.name
                }
                user.groups.unshift(newUserGroup)
                user.save().then(res.json(group))
              })
          })
        }

      })
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
        return member.user.toString() === req.user.id && member.admin
      }).length > 0;
      //Add user to group members array
      if (isMemberAndAdmin) {
        //Bring up user info
        User.findById({
            _id: req.params.userid
          })
          .then(user => {
            //Check that user is not in group already
            const isAlreadyInGroup = group.members.filter(member => member.user.toString() === req.params.userid.toString()).length > 0;
            if (isAlreadyInGroup) {
              return res.status(400).json({
                err: 'That user is already in this group'
              })
            }
            //Else add user to group
            const newUser = {
              user: user._id,
              admin: false,
              avatar: user.avatar,
              balance: 0
            };
            const newUserGroup = {
              group,
              name: group.name
            }
            user.groups.unshift(newUserGroup);
            user.save();
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
    const isMemberAndAdmin = group.members.filter(member => {
      return member.user.toString() === req.user.id && member.admin
    }).length > 0;
    if (isMemberAndAdmin) {
      group.members.forEach(member => {
        User.findById({
            _id: member.user
          })
          .then(user => {
            const removeIndex = user.groups.map(userGroup => userGroup.group.toString()).indexOf(req.params.id);
            user.groups.splice(removeIndex, 1);
            user.save();
          })
      })
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
  })
})

module.exports = router;