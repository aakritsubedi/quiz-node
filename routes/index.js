const router = require("express").Router();

const userRoutes = require('/home/aakritsubedi/Desktop/quiz/quiz-node/src/components/users/users.route.js');
const loginRoutes = require('/home/aakritsubedi/Desktop/quiz/quiz-node/src/components/auth/auth.route.js');

router.use('/login', (req,res, next) => {
  console.log("Done");
  next();
},loginRoutes);
router.use('/users', userRoutes);

module.exports = router;
