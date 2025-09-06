import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import cors from 'cors';

import routes from './routes/index.mjs';

import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './strategies/local-strategy.mjs';

dotenv.config();

const app = express();

mongoose.connect(`${process.env.DBHOST}://${process.env.DBUSER}:${process.env.DBPASSWORD}@anynote.kadvjky.mongodb.net/?retryWrites=true&w=majority&appName=anynote`)
  .then(() => console.log('Connected to database!.'))
  .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));

app.use(cookieParser(process.env.COOKIE_KEY));
app.use(session({
  secret: process.env.SESSION_KEY,
  saveUninitialized:false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60
  },
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.get('/', (req, res) => {
  res.status(201).send({ msg: 'Hello!'});
});

if (process.env.NODE_ENV !== 'production') {
  const HOST = process.env.HOST || 'localhost';
  const PORT = process.env.PORT || 3000; 
  app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
  });
}

export default app;
