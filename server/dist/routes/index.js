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
const auth_1 = require("../middlewares/auth");
const authController_1 = require("../controllers/authController");
exports.default = (app) => {
    app.get('/', (req, res) => {
        return res.send('Express + TypeScript Server');
    });
    app.post('/login', passport_1.default.authenticate('local'), (req, res) => (0, authController_1.login)(req, res));
    app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, authController_1.register)(req, res); }));
    app.get('/user', auth_1.isAuthenticatedMiddleware, (req, res) => (0, authController_1.getUser)(req, res));
    app.get('/logout', (req, res, next) => {
        (0, authController_1.logout)(req, res, next);
    });
    app.all('*', (req, res) => res.send({ error: 'Route not found' }));
};
