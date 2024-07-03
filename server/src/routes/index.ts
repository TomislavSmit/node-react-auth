import { Express, NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { isAuthenticatedMiddleware } from '../middlewares/auth'
import { login, register, logout, getUser } from '../controllers/authController'

export default (app: Express) => {
    app.get('/', (res: Response) => {
        return res.send('Express + TypeScript Server')
    })

    app.post('/login', passport.authenticate('local'), login)

    app.post('/register', register)

    app.get('/user', isAuthenticatedMiddleware, getUser)

    app.get('/logout', logout)

    app.all('*', (req: Request, res: Response) =>
        res.send({ error: 'Route not found' })
    )
}
