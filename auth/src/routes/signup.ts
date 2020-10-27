import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
//Locals
import { errorHandler } from "../middlewares/error_handler";
import { RequestvalidationError } from "../errors/request_validation_errors";
import { BadRequestError } from "../errors/bad_request_error";
import { DatabaseConnectionError } from "../errors/database_connection_error";

//Local imports
import { User } from "../models/user";
const router = express.Router();
router.post(
  "/api/users/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Email must be provided!"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 character long"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestvalidationError(errors.array());
    }

    const { email, password } = req.body;
    //Query the db for the params passed

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email is already in use");
    }

    const newUser = User.build({
      email: email,
      password: password,
    });

    await newUser.save();

    //Generate the JWT
    const userJwt = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_KEY!
    );

    //Store the jwt on a session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(newUser);
  }
);

export { router as signupRouter };
