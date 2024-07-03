import logo from '../../assets/images/spinner-loading.gif'

const Spinner = () => {
    return (
        <div className='flex justify-content-center mx-auto'>
            <div className='mx-auto my-5'>
                <img src={logo} alt='loading...' style={{ width: '30px' }} />
            </div>
        </div>
    )
}

export default Spinner
