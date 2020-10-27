import express from "express";
const router = express.Router();
router.get("/api/users/currentuser", (req, res) => {
  res.send("User is  John");
});

export { router as currentUserRouter };
