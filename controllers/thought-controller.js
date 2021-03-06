const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //get thought by thought id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    console.log("You did not find a thought with this id: " + params.thoughtId);
                    res.status(800).json(err)
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            });
    },
    // add a new thought and associate with a user
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found for this user id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // modify thought using thought id
    //api/thoughts/:thoughtId
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found for this thought id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // create a new reactions
    // /api/thoughts/:thoughtId/reactions
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found for this id to add a reaction to!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
    // remove thought
    // /api/thoughts/:thoughtId
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this thought id!' });
                }
                res.json(deletedThought);
            })
            .catch(err => res.json(err));
    },
    // remove reaction
    // /api/thoughts/:thoughtId/reactions/:reactionId
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData){
                    res.status(404).json({ message: 'No thought data found for this id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;