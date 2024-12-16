const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);

app.use('/', (req, res) => {
    res.send("Server running");
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app;