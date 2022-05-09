import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();
const port = 3333;

app.use(cors({
  origin: 'https://widget-feedback-psi.vercel.app'
}));

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || port, () => {
  console.log(`⚡Server running in http://localhost:${process.env.PORT || port}`);
});
