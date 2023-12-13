import express from 'express';
import { router } from './auth';
import { userProtectedRouter } from './routes/user-protected-routes';
import passport from 'passport';
import { pass } from './passport.auth';
import { Client } from 'pg';
import cors from 'cors';

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
app.use('/auth', router);
app.use(userProtectedRouter);
pass(passport);
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
