import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

mongoose.connect(`${process.env.DBHOST}://${process.env.DBUSER}:${process.env.DBPASSWORD}@anynote.kadvjky.mongodb.net/?retryWrites=true&w=majority&appName=anynote`)
  .then(() => console.log('Connected to database!.'))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_KEY));

app.get('/', (req, res) => {
  res.status(201).send({ msg: 'Hello!'});
});

app.get('/users/:name', (req, res) => {
  return res.status(201).send({ msg: 'Hello!'});
});

if (process.env.NODE_ENV !== 'production') {
  const HOST = process.env.HOST || 'localhost';
  const PORT = process.env.PORT || 3000; 
  app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
  });
}

export default app;
