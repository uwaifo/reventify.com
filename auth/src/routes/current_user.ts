import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();
router.get("/api/users/currentuser", (req, res) => {
  //If req.session or req.session.jwt does not exist
  if (!req.session?.jwt) {
    return res.send({
      currentUser: null,
    });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);

    res.send({
      currentUser: payload,
    });
  } catch (error) {
    res.send({
      currentUser: null,
    });
  }
});

export { router as currentUserRouter };
