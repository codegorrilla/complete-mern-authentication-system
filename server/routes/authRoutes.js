import express from "express";

import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp); //sending OTP to the registered mail id

authRouter.post("/verify-account", userAuth, verifyEmail); //verifying the account using the OTP

authRouter.post("/is-auth", userAuth, isAuthenticated); //check if the account is verified

authRouter.post("/send-reset-otp", sendResetOtp); //send password reset OTP

authRouter.post("/reset-password", resetPassword); //reset password

export default authRouter;
