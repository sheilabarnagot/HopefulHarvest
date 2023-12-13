import express from 'express';
import { Client } from 'pg';
import { registerUser, loginUser } from './controllers/authController';
import passport from 'passport';
import session from 'express-session';
import { verifyUser } from './models/user';
import { Strategy as LocalStrategy } from 'passport-local';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { userTest, uploadImage, getImage } from './controllers/user.controller';
const upload = multer({ dest: 'images/' });
dotenv.config();
const PORT = 3000;

export const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

client.connect();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173', // replace with your client's origin
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
  })
);

// app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await verifyUser(username, password);

      if (!user) {
        return done(null, false, { message: 'Invalid username or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const result = await client.query(query, values);
    const user = result.rows[0];
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app.post('/register', registerUser);
app.post('/login', passport.authenticate('local'), loginUser);

app.get('/profile', userTest);
app.post('/api/images', upload.single('image'), uploadImage);
app.get('/images/:imageName', getImage);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
