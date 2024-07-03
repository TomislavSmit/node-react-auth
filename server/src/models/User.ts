import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v: string) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(v)
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
} as const)

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject({ virtuals: true })
    delete userObject.password

    return userObject
}

userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
})

export const User = mongoose.model('users', userSchema)
