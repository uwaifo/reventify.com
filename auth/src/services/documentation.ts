//Swagger imports
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

//
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Authentication API",
      description: "Authentication API",
      version: "1.0.0",
      contact: {
        name: "Reventify.com",
      },
      servers: ["http://reventify.dev/api/users", "http://localhost:3000"],
    },
  },
  apis: ["index.js", ".routes/*.js"],
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
