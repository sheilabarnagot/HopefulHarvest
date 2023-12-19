import { client } from '../server';
import { Request, Response } from 'express';

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

    return result;
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try logging in' });
  }
};

export const uploadImageModel = async (req: Request, res: Response) => {
  req.isUnauthenticated() && res.status(401).json({ message: 'Unauthorized' });

  const imageName = req.file && req.file.filename;

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

export const getUserProducts = async (req: Request, res: Response) => {
  const query = `SELECT * FROM
                    Users INNER JOIN
                  Products ON Users.user_id = Products.user_id
                    LEFT JOIN
                  Images ON Products.product_id = Images.product_id
                    WHERE
                  Users.username = $1
                  ORDER BY Products.upload_date DESC;`;
  try {
    const params = [req.user?.username];
    const result = await client.query(query, params);

    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong', err });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  const query = `SELECT * FROM
                    Users INNER JOIN
                  Products ON Users.user_id = Products.user_id
                    LEFT JOIN
                  Images ON Products.product_id = Images.product_id
                  ORDER BY Products.upload_date DESC;`;
  try {
    const result = await client.query(query);

    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong', err });
  }
};
