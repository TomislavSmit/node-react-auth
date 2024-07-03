import express, { Express } from 'express'
import dotenv from 'dotenv'
import routes from './routes'
import mongoose from 'mongoose'
import './models/User'
import passportConfig from './services/passport'
import passport from 'passport'
import session from 'express-session'
import bodyParser from 'body-parser'
import cors from 'cors'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

// DB connection
mongoose.connect(process.env.MONGODB_URI!)

// CORS config
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
}
app.use(cors(corsOptions))

app.use(bodyParser.json())

// Auth
app.use(
    session({
        secret: 'secret',
        cookie: { maxAge: 3600000 },
        resave: false,
        saveUninitialized: false,
    })
)
app.use(passport.initialize())
app.use(passport.session())
passportConfig()

// Routes
routes(app)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})
