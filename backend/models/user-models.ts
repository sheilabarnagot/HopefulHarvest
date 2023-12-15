import { client } from '../server';
import { Request, Response } from 'express';

interface User {
  username: string;
  email: string;
  user_id: string;
}

export const userProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: 'Something went wrong! Please try log in again.' });
  }
  const sql = `SELECT username, email, user_id FROM users WHERE user_id = $1`;
  const params = [req.user.user_id];
  const query = await client.query(sql, params);
  const result = query.rows[0];
  console.log(result);
  return result;
};

export const editUserProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: 'Something went wrong! Please try log in again.' });
  }
  try {
    const sql = `UPDATE users SET username = $1, email = $2 WHERE user_id = $3`;
    const params = [req.body.username, req.body.email, req.user.user_id];
    const query = await client.query(sql, params);
    const result = query.rows[0];
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try logging in' });
  }
};
