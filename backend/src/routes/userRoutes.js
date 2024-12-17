const Router = require('express')
const userController = require ("../controllers/userController")

const router = Router();

// Sing up
router.post('/signup', userController.SignUp)

// Log in
router.post('/login', userController.LogIn)



module.exports = router;