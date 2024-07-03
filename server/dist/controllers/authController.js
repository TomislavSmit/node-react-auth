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
exports.getUser = exports.logout = exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../services/user");
const login = (req, res) => {
    // TODO: Implement response transformer/mapper
    return res.send({ success: true, user: req.user });
};
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield (0, user_1.checkExistingUser)(email);
    if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }
    bcrypt_1.default.hash(password, 10, (error, hash) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return res.status(500).json({ error });
        }
        yield (0, user_1.saveNewUser)(req, res, hash);
    }));
});
exports.register = register;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
});
exports.logout = logout;
const getUser = (req, res) => {
    const user = req.user;
    res.json({ success: true, user });
};
exports.getUser = getUser;
