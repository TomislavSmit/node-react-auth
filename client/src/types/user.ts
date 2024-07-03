export interface IUser {
    firstName: string
    lastName: string
    email: string
    password: string
    fullName?: string
}

export interface IUserLogin {
    email: string
    password: string
}
