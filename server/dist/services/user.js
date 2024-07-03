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
exports.saveNewUser = exports.checkExistingUser = void 0;
const User_1 = require("../models/User");
const checkExistingUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.User.findOne({ email });
});
exports.checkExistingUser = checkExistingUser;
const saveNewUser = (req, res, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield new User_1.User({
            email: req.body.email,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }).save();
        if (newUser) {
            req.login(newUser, function (err) {
                if (err) {
                    return res.json({ error: err });
                }
            });
            res.status(201).json({ success: true, user: req.user });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.saveNewUser = saveNewUser;
