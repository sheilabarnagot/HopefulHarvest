import express from 'express';
import passport from 'passport';
export const userProtectedRouter = express.Router();
import { userProfile, editUserProfile } from '../models/user-models';
declare global {
  namespace Express {
    interface User {
      username: string;
      email: string;
      user_id: string;
    }
  }
}

userProtectedRouter.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    !req.user && res.status(401).json({ message: 'Unauthorized' });
    const user = await userProfile(req, res);
    req && res.json({ user: user, message: 'You made it to the secure route' });
  }
);

userProtectedRouter.put(
  '/update-profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    !req.user && res.status(401).json({ message: 'Unauthorized' });
    const user = await editUserProfile(req, res);
    req && res.json({ user: user, message: 'You made it to the secure route' });
  }
);
