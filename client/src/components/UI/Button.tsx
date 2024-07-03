import classNames from 'classnames'

const Button = ({
    className,
    ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const classes =
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'

    return <button className={classNames(classes, className)} {...rest} />
}

export default Button
