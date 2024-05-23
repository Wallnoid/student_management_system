module.exports = {
    setupFilesAfterEnv: ['@testing-library/jest-dom/'],
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    transformIgnorePatterns: [
        "/node_modules/"
    ],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
};