import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();
const port = 3333;

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`⚡Server running in http://localhost:${port}`);
});
