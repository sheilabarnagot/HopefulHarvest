import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { client } from './server';
import { QueryResult } from 'pg';

dotenv.config();

export interface User {
  username: string;
  password: string;
  user_id: string;
  email: string;
  name: string;
  lastname: string;
  address: string;
  phone_number: string;
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
  } catch (e: any) {}
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = $1';
    const values: string[] = [username];
    const result: QueryResult<User> = await client.query(query, values);
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
  } catch (e: any) {}
});

export async function createDefaultUser() {
  // Hardcoded values
  const username = 'hyperslap';
  const password = '1234';
  const name = 'Pontus';
  const lastname = 'Abrahamsson';
  const email = 'defaultUser@example.com';
  const address = '123 Gatan Någonstans';
  const phone_number = '1234567890';

  const checkQuery = 'SELECT * FROM users WHERE username = $1';
  const checkValues: string[] = [username];
  const checkResult: QueryResult<User> = await client.query(
    checkQuery,
    checkValues
  );

  if (checkResult.rows.length === 0) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createQuery =
      'INSERT INTO users(username, password, email, name, lastname, address, phone_number) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const createValues = [
      username,
      hashedPassword,
      email,
      name,
      lastname,
      address,
      phone_number,
    ];
    const createResult = await client.query(createQuery, createValues);
    console.log('User created successfully');
  } else {
    console.log('User already exists');
  }
}

// Call the function
