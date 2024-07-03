import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    register?: UseFormRegister<FieldValues>
}

const Input = forwardRef(
    ({ register, name, className, ...rest }: InputProps) => {
        const classes =
            'shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

        const getRegisteredInputProps = () => {
            if (register && name) {
                return register(name)
            }
        }

        return (
            <input
                {...getRegisteredInputProps()}
                className={classNames(classes, className)}
                value={rest.value}
                {...rest}
            />
        )
    }
)

export default Input
