import  express  from 'express';
import cors from 'cors';
import  bodyParser  from 'body-parser';
import  userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

import authenticate from './middleware/authenticate.js';
dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api', userRoutes);



app.get('/auth-status', authenticate, (req, res) => {
  console.log('Token processed:', req.cookies.token);
  if (req.user) {
    console.log('User:', req.user);
    res.json({ loggedIn: true, username: req.user.username });
  } else {
    res.json({ loggedIn: false });
  }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

export default app;