const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Set up add friend at /api/users/:userId/friends
router  
.route('/:userId/friends')
.post(addFriend);

// Set up Delete friend at /api/users/:userId/friends/:friendId
router  
    .route('/:userId/friends/:friendId')
    // .post(addFriend)
    .put(deleteFriend);

module.exports = router;