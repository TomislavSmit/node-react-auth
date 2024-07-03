import classNames from 'classnames'

interface InputLabelProps {
    text: string
    addedClasses?: string
    [key: string]: any
}

const InputLabel = ({ text, addedClasses, ...rest }: InputLabelProps) => {
    const classes = 'block text-gray-700 text-sm font-bold mb-2'

    return (
        <p className={classNames(classes, addedClasses)} {...rest}>
            {text}
        </p>
    )
}

export default InputLabel
