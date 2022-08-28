import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    }),

    lastName: string({
      required_error: "Last name is required",
    }),

    password: string({
      required_error: "Password is required",
    }).min(8, "Password is too short"),

    passwordConfirmation: string({
      required_error: "Password Confirmation is required",
    }),

    email: string({
      required_error: "Last name is required",
    }).email("Please input a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["PasswordConfirmation"],
  }),
});

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
