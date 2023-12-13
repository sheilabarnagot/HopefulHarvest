import express from 'express';
import passport from 'passport';
export const userProtectedRouter = express.Router();

declare global {
  namespace Express {
    interface User {
      username: string;
      email: string;
    }
  }
}

userProtectedRouter.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    !req.user
      ? res.status(401).json({ message: 'Unauthorized' })
      : res.json({
          message: 'You are authorized to see this message.',
          user: req.user.username,
        });
  }
);
