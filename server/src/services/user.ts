import { Request, Response } from 'express'
import { User } from '../models/User'
import { IUser } from '../types/user'

export const checkExistingUser = async (
    email: string
): Promise<IUser | null> => {
    return await User.findOne({ email })
}

export const saveNewUser = async (
    req: Request,
    res: Response,
    hashedPassword: String
): Promise<void> => {
    try {
        const newUser = await new User({
            email: req.body.email,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }).save()

        if (newUser) {
            req.login(newUser, (err) => {
                if (err) {
                    return res.json({ error: err })
                }
            })
            res.status(201).json({ success: true, user: req.user })
        }
    } catch (error) {
        res.json({ error })
    }
}
