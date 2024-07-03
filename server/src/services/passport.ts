import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../models/User'
import bcrypt from 'bcrypt'
import { checkExistingUser } from './user'
import { Request } from 'express'
import { IUser } from '../types/user'

export default () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
            },
            async (email, password, done) => {
                const existingUser = await checkExistingUser(email)

                if (!existingUser) {
                    return done(null, false, {
                        message: 'Incorrect email.',
                    })
                }

                bcrypt.compare(
                    password,
                    existingUser.password,
                    (err, result) => {
                        if (err) {
                            return done(err, false)
                        }

                        if (result) {
                            return done(null, existingUser)
                        }

                        return done(null, false, {
                            message: 'Incorrect password.',
                        })
                    }
                )
            }
        )
    )

    passport.serializeUser((user: any, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id: number, done): Promise<void> => {
        try {
            const user = await User.findById(id)
            done(null, user)
        } catch (err) {
            done(err)
        }
    })
}
