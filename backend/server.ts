import express from 'express';
import { registerUser, loginUser } from './controllers/authController';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import { userTest } from './controllers/user.controller';

dotenv.config();
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post('/register', registerUser);
app.post('/login', passport.authenticate('local'), loginUser);

app.get('/profile', userTest);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
