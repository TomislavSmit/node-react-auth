import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { checkExistingUser, saveNewUser } from '../services/user'

const login = (req: Request, res: Response) => {
    // TODO: Implement response transformer/mapper
    return res.send({ success: true, user: req.user })
}
const register = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await checkExistingUser(email)

    if (existingUser) {
        res.status(400).json({ message: 'User already exists' })
        return
    }

    bcrypt.hash(password, 10, async (error, hash) => {
        if (error) {
            return res.status(500).json({ error })
        }

        await saveNewUser(req, res, hash)
    })
}

const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    req.logout((err) => {
        if (err) {
            next(err)
        }

        res.json({ success: true, message: 'Logged out successfully' })
    })
}

const getUser = (req: Request, res: Response): void => {
    const user = req.user

    res.json({ success: true, user })
}

export { login, register, logout, getUser }
