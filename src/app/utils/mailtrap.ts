import type SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import { env } from "../../env.js";
import nodemailer from "nodemailer";

class MailTrapConfig {
  public createTransport: () => nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;
  constructor(
    host: string,
    port: number,
    authUser: string,
    authPassword: string,
  ) {
    this.createTransport = function () {
      return nodemailer.createTransport({
        host,
        port,
        auth: {
          user: authUser,
          pass: authPassword,
        },
      });
    };
  }
}

//MAKING OBJECT OF MAILTRAP CONFIG WITH THE ENV VARIBLES AS HOST,PORT,USER,PASSWORD
const mailtrapConfig = new MailTrapConfig(
  env.MAILTRAP_HOST,
  Number(env.MAILTRAP_PORT),
  env.MAILTRAP_USER,
  env.MAILTRAP_PASSWORD,
);

//SINGLETON CONCEPT
const createTransport = mailtrapConfig.createTransport;
export { createTransport };
