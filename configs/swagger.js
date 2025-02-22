import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "GestorOp API",
            version: "1.0.0",
            description: "API para la gestión de operaciones",
            contact: {
                name: "José Gabriel Contreras Sánchez",
                email: "josegabriel@example.com"
            }
        },
        servers: [
            {
                url: "http://127.0.0.1:3000/gestorOp/v1"
            }
        ]
    },
    apis: [
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/post/post.routes.js",
        "./src/comments/comment.routes.js",
        "./src/category/category.routes.js"
    ]
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };
