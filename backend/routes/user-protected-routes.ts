import express from 'express';
import passport from 'passport';
import fs from 'fs';

import {
  userProfile,
  editUserProfile,
  uploadImageModel,
  getUserProducts,
  getAllProducts,
} from '../models/user-models';
import { Request, Response } from 'express';
import { upload } from '../server';
import { pass } from '../passport.auth';
declare global {
  namespace Express {
    interface User {
      username: string;
      email?: string;
      user_id?: string;
    }
  }
}

export const userProtectedRouter = express.Router();

userProtectedRouter.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      const user = await userProfile(req, res);
      req &&
        res.json({ user: user, message: 'You made it to the secure route' });
    }
  }
);

userProtectedRouter.post('/logout', (req, res) => {
  try {
    res.clearCookie('token');

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', (error as Error).message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

userProtectedRouter.put(
  '/update-profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    !req.user && res.status(401).json({ message: 'Unauthorized' });

    try {
      const user = await editUserProfile(req, res);
      req &&
        res.json({ user: user, message: 'You made it to the secure route' });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Something went wrong! Please try logging in' });
    }
  }
);

userProtectedRouter.get(
  '/get-image/:imageName',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const imageName = req.params.imageName;
    const readStream = fs.createReadStream(`images/${imageName}`);
    readStream.pipe(res);
  }
);

userProtectedRouter.post(
  '/get-products',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    getUserProducts(req, res);
  }
);

userProtectedRouter.get(
  '/get-all-products',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    getAllProducts(req, res);
  }
);

export const uploadImage = (req: Request, res: Response) => {
  const imageName = req.file && req.file.filename;
  const description: string = req.body.description;
  uploadImageModel(req, res);
};
