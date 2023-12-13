import { Request, Response } from 'express';
import fs from 'fs';

export const userTest = async (req: Request, res: Response) => {
  console.log(req.isAuthenticated());
  console.log('userTest');
  req.isAuthenticated()
    ? res.send({ message: 'You are logged in' })
    : res.status(401).send({ message: 'You are not logged in' });
};

export const uploadImage = async (req: Request, res: Response) => {
  const imageName = req.file && req.file.filename;
  const description = req.body.description;
  // upload.single('image');
  res.send({ description, imageName });
};

export const getImage = async (req: Request, res: Response) => {
  const imageName = req.params.imageName;
  console.log(imageName);
  const readStream = fs.createReadStream(`images/${imageName}`);
  readStream.pipe(res);
};
