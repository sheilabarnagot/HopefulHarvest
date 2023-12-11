import express from 'express';
import { registerUser, loginUser } from './controllers/authController';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post('/register', registerUser);
app.post('/login', passport.authenticate('local'), loginUser);

app.get('/profile', (req, res) => {
  req.isAuthenticated()
    ? res.send({ message: 'You are logged in' })
    : res.status(401).send({ message: 'You are not logged in' });

  req.logout(() => {
    console.log('You are logged out');
  });

  req.authInfo;
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
