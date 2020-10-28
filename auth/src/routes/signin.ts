import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

//Local imports
import { validateRequest } from "../middlewares/validate_request";
import { User } from "../models/user";
import { Password } from "../services/password";
import { BadRequestError } from "../errors/bad_request_error";

const router = express.Router();
router.post(
  "/api/users/signin",
  [
    body("email")
      .isEmail()
      .withMessage("Email must be provided!"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must suppy a password"),
    validateRequest,
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    //For auth we want to share as little info as possible about the error

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid Credentials");
    }
    //Generate the JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    //Store the jwt on a session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
