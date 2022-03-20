const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// add prefix of `/thoughts` to routes created in `comments-routes.js`
router.use('/thoughts', thoughtRoutes);

// add prefix of `/users` to routes created in `pizza-routes.js`
router.use('/users', userRoutes);

module.exports = router;