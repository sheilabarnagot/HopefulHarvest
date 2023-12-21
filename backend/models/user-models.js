"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.getUserProducts = exports.uploadImageModel = exports.editUserProfile = exports.userProfile = void 0;
const server_1 = require("../server");
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res
            .status(401)
            .json({ message: 'Something went wrong! Please try log in again.' });
    }
    const sql = `SELECT username, email, user_id FROM users WHERE user_id = $1`;
    const params = [req.user.user_id];
    const query = yield server_1.client.query(sql, params);
    const result = query.rows[0];
    return result;
});
exports.userProfile = userProfile;
const editUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res
            .status(401)
            .json({ message: 'Something went wrong! Please try log in again.' });
    }
    try {
        const sql = `UPDATE users SET username = $1, email = $2 WHERE user_id = $3`;
        const params = [req.body.username, req.body.email, req.user.user_id];
        const query = yield server_1.client.query(sql, params);
        const result = query.rows[0];
        return result;
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: 'Something went wrong! Please try logging in' });
    }
});
exports.editUserProfile = editUserProfile;
const uploadImageModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    req.isUnauthenticated() && res.status(401).json({ message: 'Unauthorized' });
    const imageName = req.file && req.file.filename;
    try {
        yield server_1.client.query('BEGIN');
        const productQuery = `INSERT INTO products (product_name, description, price, stock_quantity, user_id)
  VALUES ($1,$2,$3,$4,$5) RETURNING *`;
        const productParams = [
            req.body.product_name,
            req.body.description,
            req.body.price,
            req.body.stock_quantity,
            (_a = req.user) === null || _a === void 0 ? void 0 : _a.user_id,
        ];
        const productQueryRes = yield server_1.client.query(productQuery, productParams);
        const sql = `INSERT INTO images (image_ref, user_id, product_id) VALUES ($1, $2, $3) RETURNING *`;
        const params = [
            imageName,
            (_b = req.user) === null || _b === void 0 ? void 0 : _b.user_id,
            productQueryRes.rows[0].product_id,
        ];
        const query = yield server_1.client.query(sql, params);
        const result = query.rows[0];
        yield server_1.client.query('COMMIT');
        res.send({
            imageName,
            productQuery: productQueryRes.rows[0],
            imageQuery: result,
        });
    }
    catch (e) {
        yield server_1.client.query('ROLLBACK');
        throw e;
    }
});
exports.uploadImageModel = uploadImageModel;
const getUserProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const query = `SELECT * FROM
                    Users INNER JOIN
                  Products ON Users.user_id = Products.user_id
                    LEFT JOIN
                  Images ON Products.product_id = Images.product_id
                    WHERE
                  Users.username = $1
                  ORDER BY Products.upload_date DESC;`;
    try {
        const params = [(_c = req.user) === null || _c === void 0 ? void 0 : _c.username];
        const result = yield server_1.client.query(query, params);
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong', err });
    }
});
exports.getUserProducts = getUserProducts;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT Products.*, Images.*, Users.username, Users.user_id FROM
                    Users INNER JOIN
                  Products ON Users.user_id = Products.user_id
                    LEFT JOIN
                  Images ON Products.product_id = Images.product_id
                  ORDER BY Products.upload_date DESC;`;
    try {
        const result = yield server_1.client.query(query);
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong', err });
    }
});
exports.getAllProducts = getAllProducts;
//# sourceMappingURL=user-models.js.map