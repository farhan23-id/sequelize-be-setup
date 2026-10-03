const express = require("express");

const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const router = express.Router();
const profileRouter = require("./profile.router");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/profile", profileRouter);

module.exports = router;
