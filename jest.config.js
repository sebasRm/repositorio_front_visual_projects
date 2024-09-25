// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Puedes ajustar esto según tus necesidades
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
