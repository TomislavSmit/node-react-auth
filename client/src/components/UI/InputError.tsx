import classNames from 'classnames'

interface InputErrorProps {
    message: string
    addedClasses?: string
}

const InputError = ({ message, addedClasses }: InputErrorProps) => {
    // TODO: implement component types for different purposes
    const classes = 'text-red-500 text-xs italic my-1'

    return <p className={classNames(classes, addedClasses)}>{message}</p>
}

export default InputError
