const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Desafio Técnico',
      version: '1.0.0',
      description: 'Desafio Técnico - Desenvolvedor Pleno/Sênior'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/common/swagger/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
