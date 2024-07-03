import { Request, Response } from 'express'
import { checkExistingUser, saveNewUser } from '../../src/services/user'
import { User } from '../../src/models/User'
import { IUser } from '../../src/types/user'

jest.mock('../../src/models/User')

describe('Auth Controller', () => {
    describe('checkExistingUser', () => {
        it('should return a user if found', async () => {
            const mockUser = { email: 'test@example.com' } as IUser
            ;(User.findOne as jest.Mock).mockResolvedValue(mockUser)

            const result = await checkExistingUser('test@example.com')
            expect(result).toEqual(mockUser)
        })

        it('should return null if no user found', async () => {
            ;(User.findOne as jest.Mock).mockResolvedValue(null)

            const result = await checkExistingUser('test@example.com')
            expect(result).toBeNull()
        })
    })

    describe('saveNewUser', () => {
        let req: Partial<Request>
        let res: Partial<Response>
        let saveMock: jest.Mock

        beforeEach(() => {
            req = {
                body: {
                    email: 'test@example.com',
                    password: 'hashedpassword',
                    firstName: 'Test',
                    lastName: 'User',
                },
                // @ts-ignore
                login: jest.fn((user, callback) => callback(null)),
            }

            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            }

            saveMock = jest.fn()
            User.prototype.save = saveMock
        })

        it('should save a new user and log them in', async () => {
            const mockUser = {
                email: 'test@example.com',
                password: 'hashedpassword',
                firstName: 'Test',
                lastName: 'User',
            }
            saveMock.mockResolvedValue(mockUser)

            await saveNewUser(req as Request, res as Response, 'hashedpassword')

            expect(saveMock).toHaveBeenCalledWith()
            expect(req.login).toHaveBeenCalledWith(
                mockUser,
                expect.any(Function)
            )
            expect(res.status).toHaveBeenCalledWith(201)
        })

        it('should return an error if saving the user fails', async () => {
            const error = new Error('Save failed')
            saveMock.mockRejectedValue(error)

            await saveNewUser(req as Request, res as Response, 'hashedpassword')

            expect(saveMock).toHaveBeenCalledWith()
            expect(res.json).toHaveBeenCalledWith({ error })
        })

        it('should return an error if login fails', async () => {
            const mockUser = {
                email: 'test@example.com',
                password: 'hashedpassword',
                firstName: 'Test',
                lastName: 'User',
            }
            const error = new Error('Login failed')
            // @ts-ignore
            req.login = jest.fn((user, callback) => callback(error))
            saveMock.mockResolvedValue(mockUser)

            await saveNewUser(req as Request, res as Response, 'hashedpassword')

            expect(saveMock).toHaveBeenCalledWith()
            expect(req.login).toHaveBeenCalledWith(
                mockUser,
                expect.any(Function)
            )
            expect(res.json).toHaveBeenCalledWith({ error })
        })
    })
})
