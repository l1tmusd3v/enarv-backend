const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Enarv Backend API",
    version: "1.0.0",
    description: "API documentation for the Enarv Backend",
  },
  servers: [
    {
        url: "https://api.enarv.com/",
        description: "Production server",
    },
    {
      url: "http://localhost:3306/",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [], 
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/api/routes/*.js", "./src/api/models/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
