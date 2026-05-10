import 'dotenv/config';
import express from 'express';

const app = express();

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log('The server is running at', PORT);
});
