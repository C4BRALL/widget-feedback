import express from 'express';
import nodemailer from 'nodemailer';
import { prisma } from './prisma';

const app = express();
const port = 3333;
app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "44efce16768384",
    pass: "0e5703aaa90e8b"
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  transport.sendMail({
    from: 'Equipe Feedget <devtester@feedget.com>',
    to: 'Cabral <cabral047dev@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo de feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join('\n')
  });

  return res.status(201).json({ data: feedback });
})

app.listen(port, () => {
  console.log(`⚡Server running in http://localhost:${port}`);
});
