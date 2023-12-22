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
exports.uploadImage = exports.userProtectedRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const fs_1 = __importDefault(require("fs"));
const user_models_1 = require("../models/user-models");
exports.userProtectedRouter = express_1.default.Router();
exports.userProtectedRouter.get('/protected', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: 'Unauthorized' });
    }
    else {
        const user = yield (0, user_models_1.userProfile)(req, res);
        req &&
            res.json({ user: user, message: 'You made it to the secure route' });
    }
}));
exports.userProtectedRouter.post('/logout', (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: 'Logout successful' });
    }
    catch (error) {
        console.error('Error during logout:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.userProtectedRouter.put('/update-profile', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    !req.user && res.status(401).json({ message: 'Unauthorized' });
    try {
        const user = yield (0, user_models_1.editUserProfile)(req, res);
        req &&
            res.json({ user: user, message: 'You made it to the secure route' });
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: 'Something went wrong! Please try logging in' });
    }
}));
exports.userProtectedRouter.get('/get-image/:imageName', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    const imageName = req.params.imageName;
    if (!imageName) {
        res.status(400).json({ error: 'Image name is required' });
        return;
    }
    const readStream = fs_1.default.createReadStream(`images/${imageName}`);
    readStream.on('error', function (err) {
        res.status(500).json({ error: 'Error reading file' });
    });
    readStream.pipe(res);
});
exports.userProtectedRouter.post('/get-products', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    (0, user_models_1.getUserProducts)(req, res);
});
exports.userProtectedRouter.get('/get-all-products', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    (0, user_models_1.getAllProducts)(req, res);
});
const uploadImage = (req, res) => {
    const imageName = req.file && req.file.filename;
    const description = req.body.description;
    (0, user_models_1.uploadImageModel)(req, res);
};
exports.uploadImage = uploadImage;
//# sourceMappingURL=user-protected-routes.js.map