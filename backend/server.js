"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const auth_1 = require("./auth");
const user_protected_routes_1 = require("./routes/user-protected-routes");
const passport_1 = __importDefault(require("passport"));
const passport_auth_1 = require("./passport.auth");
const pg_1 = require("pg");
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
exports.upload = (0, multer_1.default)({ dest: 'images/' });
const app = (0, express_1.default)();
const PORT = 3000;
exports.client = new pg_1.Client({
    user: process.env.PGUSER,
    host: 'localhost',
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(5432),
});
exports.client.connect();
app.use('/', (0, cors_1.default)());
app.use(express_1.default.json());
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
// creates a default user if not exists
(0, auth_1.createDefaultUser)();
app.use('/auth', auth_1.router);
app.use('/', (0, cors_1.default)(), user_protected_routes_1.userProtectedRouter);
app.post('/upload-image', passport_1.default.authenticate('jwt', { session: false }), exports.upload.single('image'), (req, res) => {
    (0, user_protected_routes_1.uploadImage)(req, res);
});
(0, passport_auth_1.pass)(passport_1.default);
app.use(passport_1.default.initialize());
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map