module.exports = {
  PORT: process.env.PORT || 8000,
  CLIENT_ORIGIN: 'http://localhost:3000/',
  // CLIENT_ORIGIN: 'http://localhost:3000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN,
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://adammain:@localhost/opentime',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://adammain:@localhost/blogful-test'
}