import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import contactRouter from './routers/contactRouter.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static('../client/dist'));

app.use(authRouter);
app.use(userRouter);
app.use(contactRouter);

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.resolve('../client/dist/index.html'));
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
