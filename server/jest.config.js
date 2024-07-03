module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/__tests__/**'],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
}
