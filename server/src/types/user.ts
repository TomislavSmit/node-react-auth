export interface IUser {
    id: number | string
    email: string
    password: string
    firstName: string
    lastName: string
    toJSON(): IUser
}
