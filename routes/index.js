const router = require("express").Router();

const userRoutes = require('../src/components/users/users.route');
const loginRoutes = require('../src/components/auth/auth.route');

router.use('/login', loginRoutes);
router.use('/users', userRoutes);

module.exports = router;
