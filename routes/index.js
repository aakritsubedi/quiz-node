const router = require("express").Router();

const userRoutes = require('../src/components/users/users.route');
const loginRoutes = require('../src/components/auth/auth.route');

const checkAuth = require('../src/middlewares/checkAuth');

router.use('/login', loginRoutes);
router.use('/users', checkAuth, userRoutes);

module.exports = router;
