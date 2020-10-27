import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import colors = require("colors");

import { json } from "body-parser";
import mongoose from "mongoose";

//LOCAL IMPORTS
import { currentUserRouter } from "./routes/current_user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error_handler";
import { NotFoundError } from "./errors/not_found_error";
//
colors.enable();
const port = 3000;
const app = express();
//Inform express that we are working behind a proxt . ie Nginx/Ingress
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

//Test route
app.all("*", async () => {
  //Utilizing async-errors
  throw new NotFoundError();
});

app.use(errorHandler);
const startUp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    //console.log("Connected to mongodb ");
    console.log(`🚀 . . Connected to: ${mongoose.connection.host}`.red.bold);
  } catch (error) {
    console.log(error);
  }
};
app.listen(3000, () => {
  console.log(
    colors.yellow.bold(`🚀 . . Server is Listening at http://localhost:${port}`)
  );
});
startUp();
