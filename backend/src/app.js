import  express  from 'express';
import cors from 'cors';
import  bodyParser  from 'body-parser';

import  userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

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

export default app;