import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";
import log from "./logger";

// const createTestCreds = async () => {
//   const creds = await nodemailer.createTestAccount();
//   console.log(creds);
// };

// createTestCreds();

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>("smtp");

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
});

export const sendEmail = async (payload: SendMailOptions) => {
  transporter.sendMail(payload, (err, info) => {
    if (err) return log.error("Error sending email. error ==> %o", err);

    log.info(`Preview URL:  ${nodemailer.getTestMessageUrl(info)}`);
  });
};
