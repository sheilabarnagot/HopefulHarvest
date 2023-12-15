import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotnenv from 'dotenv';
import { client } from './server';

dotnenv.config();

interface User {
  username: string;
  password: string;
}
export const router = express.Router();
export const users: User[] = [];

router.post('/register', async (req, res) => {
  try {
    const { username, password, name, lastname, email, address, phone_number } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      'INSERT INTO users(username, password, email, name, lastname, address, phone_number) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [
      username,
      hashedPassword,
      email,
      name,
      lastname,
      address,
      phone_number,
    ];
    const result = await client.query(query, values);
    res
      .status(201)
      .json({ message: 'User registered successfully', user: result });
  } catch (e: any) {
    console.log(e.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    const result = await client.query(query, values);
    const user = result.rows[0];
    // const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    );
    users.push(user);
    res.json({ message: 'Logged in successfully', token, user: user.user_id });
  } catch (e: any) {
    console.log(e.message);
  }
});
