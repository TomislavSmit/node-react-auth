import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import LoginPage from './LoginPage'
import { loginUser } from '../api/auth'

jest.mock('../api/auth', () => ({
    loginUser: jest.fn(),
}))

describe('LoginPage Component', () => {
    test('renders correctly when no user is logged in', () => {
        const { getByText } = render(<LoginPage />)
        expect(screen.getByText('Log in')).toBeInTheDocument()
    })

    test('handles successful login', async () => {
        const { getByText, getByLabelText } = render(<LoginPage />)
        const emailInput = screen.getByLabelText('Email')
        const passwordInput = screen.getByLabelText('Password')
        const loginButton = screen.getByText('Log in')

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password123' } })

        loginUser.mockResolvedValueOnce({ success: true })

        fireEvent.click(loginButton)

        await waitFor(() => {
            expect(window.location.reload).toHaveBeenCalledTimes(1)
        })
    })

    test('handles failed login and sets error message', async () => {
        const { getByText, getByLabelText } = render(<LoginPage />)
        const emailInput = screen.getByLabelText('Email')
        const passwordInput = screen.getByLabelText('Password')
        const loginButton = screen.getByText('Log in')

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password123' } })

        loginUser.mockRejectedValueOnce(new Error('User not found'))

        fireEvent.click(loginButton)

        await waitFor(() => {
            expect(screen.getByText('User not found')).toBeInTheDocument()
        })
    })
})
