import { Client } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {
  strategy,
  passportSerializeUser,
  passposrtDeserializeUser,
} from '../passport/init.passport';
dotenv.config();

interface User {
  username: string;
  password: string;
  name: string;
  lastname: string;
  email: string;
}
// https://www.typescriptlang.org/docs/handbook/declaration-merging.html
// https://stackoverflow.com/questions/65772869/how-do-i-type-hint-the-user-argument-when-calling-passport-serializeuser-in-type
declare global {
  namespace Express {
    interface User {
      username: string;
    }
  }
}

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PGPORT),
});

client.connect();

strategy();
passportSerializeUser();
passposrtDeserializeUser(client);

export const createUser = async (user: User) => {
  const { username, password, name, lastname, email } = user;
  console.log(username, password, name, lastname, email);
  const hashedPassword = await bcrypt.hash(String(password), 10);
  const query =
    'INSERT INTO users(username, password, name, lastname, email) VALUES($1, $2, $3, $4, $5) RETURNING *';
  const values = [username, hashedPassword, name, lastname, email];

  const result = await client.query(query, values);
  return result.rows[0];
};

export const verifyUser = async (username: string, password: string) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const result = await client.query(query, values);
  const user = result.rows[0];
  if (!user) {
    return null;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }
  return user;
};
