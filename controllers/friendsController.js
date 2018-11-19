const User = require('../models/user');

const createFriendship = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      console.log(user);
      user.friends.push({ userId: req.tokenUserId });
      return user.save();
    })
    .then(user => User.populate(user, 'friends.userId'))
    .then(user => res.json(user))
    .catch(next);
};

const acceptFriendRequest = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      const friendship = user.friends.id(req.params.friendshipId);
      friendship.status = 'Accepted';
      console.log(user.friendsList);
      // User.findById(req.tokenUserId)
      //   .then(user2 => {
      //     console.log(user2, '<====this is the current user', 'this is the user that is being added=>>>>', user);
      //     user.friends.push({ userId: req.params.userId, status: 'Accepted' });
      //     // return user.save();
      //   })
      //   .then(user => User.populate(user, 'friends.userId'))
      //   .then(user => res.json(user))
      //   .catch(next);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
};

const rejectFriendRequest = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      const friendship = user.friends.id(req.params.friendshipId);
      friendship.remove();
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
};

module.exports = {
  create: createFriendship,
  accept: acceptFriendRequest,
  reject: rejectFriendRequest
};
