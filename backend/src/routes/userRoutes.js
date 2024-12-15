const Router = require('express')
const userController = require ("../controllers/userController")

const router = Router();

router.get('/login', userController.LogIn)


module.exports = router;