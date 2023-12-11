import { Request, Response } from 'express';

export const userTest = async (req: Request, res: Response) => {
  req.isAuthenticated()
    ? res.send({ message: 'You are logged in' })
    : res.status(401).send({ message: 'You are not logged in' });
};
