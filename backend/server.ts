import express from 'express';
import path from 'path';
import { router } from './auth';
import {
  userProtectedRouter,
  uploadImage,
} from './routes/user-protected-routes';

import passport from 'passport';
import { pass } from './passport.auth';
import { Client } from 'pg';
import cors from 'cors';
import multer from 'multer';
export const upload = multer({ dest: 'images/' });
const app = express();
const PORT = 3000;
export const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

client.connect();
app.use('/', cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/auth', router);
app.use('/', cors(), userProtectedRouter);
app.post(
  '/upload-image',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  (req, res) => {
    uploadImage(req, res);
  }
);

pass(passport);
app.use(passport.initialize());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
