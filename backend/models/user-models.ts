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

// export const uploadImageModel = async (req: Request, res: Response) => {
//   req.isUnauthenticated() && res.status(401).json({ message: 'Unauthorized' });

//   const imageName = req.file && req.file.filename;
//   const product_id = req.body.product_id;
//   console.log(req.user);
//   const sql = `INSERT INTO images (image_ref, user_id, product_id) VALUES ($1, $2, $3) RETURNING *`;
//   const params = [imageName, req.user?.user_id, product_id];
//   const query = await client.query(sql, params);
//   const result = query.rows[0];
//   console.log(result);

//   res.send({ imageName });
// };

export const uploadImageModel = async (req: Request, res: Response) => {
  req.isUnauthenticated() && res.status(401).json({ message: 'Unauthorized' });

  const imageName = req.file && req.file.filename;

  console.log(req.body.product_name);

  console.log(req.user);
  try {
    await client.query('BEGIN');
    const productQuery = `INSERT INTO products (product_name, description, price, stock_quantity, user_id)
  VALUES ($1,$2,$3,$4,$5) RETURNING *`;
    const productParams = [
      req.body.product_name,
      req.body.description,
      req.body.price,
      req.body.stock_quantity,
      req.user?.user_id,
    ];
    const productQueryRes = await client.query(productQuery, productParams);
    console.log({ prodyct: productQueryRes.rows });
    const sql = `INSERT INTO images (image_ref, user_id, product_id) VALUES ($1, $2, $3) RETURNING *`;
    const params = [
      imageName,
      req.user?.user_id,
      productQueryRes.rows[0].product_id,
    ];
    const query = await client.query(sql, params);
    const result = query.rows[0];
    await client.query('COMMIT');
    res.send({
      imageName,
      productQuery: productQueryRes.rows[0],
      imageQuery: result,
    });
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  }
};
