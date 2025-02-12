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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("./user");
exports.default = () => {
    passport_1.default.use(new passport_local_1.Strategy({
        usernameField: 'email',
    }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield (0, user_1.checkExistingUser)(email);
        if (!existingUser) {
            return done(null, false, {
                message: 'Incorrect email.',
            });
        }
        bcrypt_1.default.compare(password, existingUser.password, (err, result) => {
            if (err) {
                return done(err, false);
            }
            if (result) {
                return done(null, existingUser);
            }
            return done(null, false, {
                message: 'Incorrect password.',
            });
        });
    })));
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_1.User.findById(id);
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    }));
};
