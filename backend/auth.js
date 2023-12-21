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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("./server");
dotenv_1.default.config();
exports.router = express_1.default.Router();
exports.users = [];
exports.router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, name, lastname, email, address, phone_number } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const query = 'INSERT INTO users(username, password, email, name, lastname, address, phone_number) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [
            username,
            hashedPassword,
            email,
            name,
            lastname,
            address,
            phone_number,
        ];
        const result = yield server_1.client.query(query, values);
        res
            .status(201)
            .json({ message: 'User registered successfully', user: result });
    }
    catch (e) { }
}));
exports.router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const query = 'SELECT * FROM users WHERE username = $1';
        const values = [username];
        const result = yield server_1.client.query(query, values);
        const user = result.rows[0];
        // const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const token = jsonwebtoken_1.default.sign({ username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        exports.users.push(user);
        res.json({ message: 'Logged in successfully', token, user: user.user_id });
    }
    catch (e) { }
}));
//# sourceMappingURL=auth.js.map