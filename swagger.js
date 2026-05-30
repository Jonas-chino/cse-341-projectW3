const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Entertainment API',
    description: 'API for project BYUI week 3 and 4'
  },

  host: 'localhost:3000',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);    