"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
require("./models/User");
const passport_1 = __importDefault(require("./services/passport"));
const passport_2 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// DB connection
mongoose_1.default.connect(process.env.MONGODB_URI);
// CORS config
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
// Auth
app.use((0, express_session_1.default)({
    secret: 'secret',
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_2.default.initialize());
app.use(passport_2.default.session());
(0, passport_1.default)();
// Routes
(0, routes_1.default)(app);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
