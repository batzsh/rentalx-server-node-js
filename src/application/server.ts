import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "@docs/swagger.json";

import { AppException } from "@application/exceptions/AppException";
import { router } from "./routes";

import createConnection from "@infra/repositories/typeorm";
import "@infra/_shared/container";

createConnection();

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppException) {
    return response.status(error.statusCode).json({
      message: error.message
    });
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal Server Error - ${error.message}`
  });
});

app.listen(3333, () => {
  console.log("Server is running on port 3333...");
});
