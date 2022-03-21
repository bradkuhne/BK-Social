const router = require('express').Router();
const { getAllThought, getThoughtById, addThought, updateThought, removeThought, addReaction, removeReaction 
} = require('../../controllers/thought-controller');

//Get all thoughts
// /api/thoughts
router
    .route('/')
    .get(getAllThought);
    
// Add a thought by userId and push to a user
// /api/thoughts/:userId
router
    .route('/:userId')
    .post(addThought)     

// thoughts by thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// reactions routes
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').put(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;