import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import contactRouter from './routers/contactRouter.js';

const app = express();

// ====================
//  MIDDLEWARE
// ====================

app.use(helmet());
app.use(cors({ 
  origin: process.env.CLIENT_URL, 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// ====================
//  ROUTERS
// ====================

app.use(authRouter);
app.use(userRouter);
app.use(contactRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});