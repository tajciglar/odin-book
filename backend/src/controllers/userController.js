const { body, validationResult } = require('express-validator')
async function SignUp(req, res) {
    console.log(req.body)
    // Input validation 
    await body('email').isEmail().withMessage('Must be a valid email').run(req);
    await body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').run(req);
    await body('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }).run(req);

    const errors = validationResult(req);

    // Send back validation errors
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        })
    }

    const checkEmail = await.
}


function LogIn(req, res) {
  console.log(req.body); 
  res.json({ message: 'Login successful' });
}

module.exports = {
    SignUp,
    LogIn,
}