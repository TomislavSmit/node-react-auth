import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import HomePage from '../src/pages/HomePage'
import AuthContext from '../src/context/auth'

jest.mock(
    '../components/layout/Layout',
    () =>
        ({ children }: { children: React.ReactNode }) =>
            <div>{children}</div>
)

describe('HomePage', () => {
    it('renders welcome message with user full name when user is provided', () => {
        const user = {
            fullName: 'John Doe',
            firstName: 'John',
            lastName: 'Doe',
            password: 'asdf',
            email: 'newuser@example.com',
            id: 1,
        }
        const { getByText } = render(
            <AuthContext.Provider value={{ user, setUser: () => {} }}>
                <HomePage />
            </AuthContext.Provider>
        )

        expect(getByText('Welcome John Doe')).toBeInTheDocument()
    })

    it('renders welcome message with no user when user is not provided', () => {
        const { getByText } = render(
            <AuthContext.Provider value={{ user: null, setUser: () => {} }}>
                <HomePage />
            </AuthContext.Provider>
        )

        expect(getByText('Welcome')).toBeInTheDocument()
    })
})
