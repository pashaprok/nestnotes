import { createTransport, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { User } from '../modules/users/users.model';
import { mailConfig } from '../config/mail';

export class Email {
  private readonly fromEmail: string = mailConfig.fromEmail;
  private readonly toEmail: string;
  private readonly user: User;

  constructor(user: User) {
    this.user = user;
    this.toEmail = user.email;
  }

  private static transporter(): Transporter<SMTPTransport.SentMessageInfo> {
    return createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      auth: {
        user: mailConfig.auth.user,
        pass: mailConfig.auth.pass,
      },
    });
  }

  protected async send(subject, text) {
    const mailOptions: Mail.Options = {
      from: this.fromEmail,
      to: this.toEmail,
      subject,
      text,
    };

    await Email.transporter().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(
      'Welcome',
      `Hi, ${this.user.name}! Welcome to the NestNotes!`,
    );
  }
}
