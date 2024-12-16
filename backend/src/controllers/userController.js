function LogIn(req, res) {
  console.log(req.body); 
  res.json({ message: 'Login successful' });
}

module.exports = {
    LogIn,
}