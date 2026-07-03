const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

class SwaggerConfig {
  constructor() {
    this.options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Product CRUD API",
          version: "1.0.0",
          description:
            "Product CRUD API with Authentication, Cloudinary, Winston and Swagger",
        },

        servers: [
          {
            url: `http://localhost:${process.env.PORT}`,
            description: "Development Server",
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
      },

      apis: ["./app/routes/*.js"],
    };

    this.swaggerSpec = swaggerJsDoc(this.options);
  }

  setup(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(this.swaggerSpec));
  }
}

module.exports = new SwaggerConfig();
