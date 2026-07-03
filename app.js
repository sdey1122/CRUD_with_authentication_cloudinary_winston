const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const expressWinston = require("express-winston");

const database = require("./app/config/db");

const logger = require("./app/utils/logger");

const swagger = require("./app/swagger/swagger");

const authRoutes = require("./app/routes/authRoutes");
const productRoutes = require("./app/routes/productRoutes");

const errorMiddleware = require("./app/middlewares/errorMiddleware");

dotenv.config();

const app = express();

// database-connection
database.connect();

// global-middlewares
app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// request-logger
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  }),
);

// swagger-documnetation
swagger.setup(app);

// routes
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

// default-routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Product CRUD API is running successfully.",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// error-middleware
app.use(errorMiddleware);

// server
const PORT = process.env.PORT || 6159;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
