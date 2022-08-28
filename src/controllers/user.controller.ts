import { Request, Response } from "express";

import { CreateUserInput, VerifyUserInput } from "../schemas/user.schema";
import { findUserById, newUser } from "../services/user.service";
import log from "../utils/logger";
import { sendEmail } from "../utils/mailer";

export const createUser = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const body = req.body;

  try {
    const user = await newUser(body);

    await sendEmail({
      from: "test@example.com",
      to: user.email,
      subject: "Please verify your account",
      text: `verification code ${user.verificationCode}.`,
    });

    res.json({
      message: "User created",
      status: true,
      data: user,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(409).send("Account already exists");
    }

    res.status(500).send("Internal server error");
    log.error(error);
  }
};

export const verifyUser = async (
  req: Request<VerifyUserInput>,
  res: Response
) => {
  const { id, verificationCode } = req.params;

  const user = findUserById(id);

  if (!user) return res.status(400).send("Could not find user");
  if (user.verified) return res.status(400).send("User is already verified");

  if (user.verificationCode === verificationCode) {
    user.verified = true;
    await user.save();

    return res.send("User successfully verified");
  }

  return res.status(400).send("Could not verify user");
};
