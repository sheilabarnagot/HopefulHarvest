import { Client } from 'pg';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { verifyUser } from '../models/user';

export const strategy = () => {
  return passport.use(
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
};

export const passportSerializeUser = () => {
  return passport.serializeUser((user, done) => {
    done(null, user.username);
  });
};

export const passposrtDeserializeUser = (client: Client) => {
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
};
