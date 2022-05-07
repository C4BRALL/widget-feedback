import { MailPlugin, SendMailData } from "../mail-plugin";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "44efce16768384",
    pass: "0e5703aaa90e8b"
  }
});

export class NodemailerMailPlugin implements MailPlugin {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <devtester@feedget.com>',
      to: 'Cabral <cabral047dev@gmail.com>',
      subject,
      html: body,
    });
  };
}