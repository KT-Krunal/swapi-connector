import express from 'express';
import cors from 'cors';
import starshipsRouter from './routes/starshipsRouter';
import speciesRouter from './routes/speciesRouter';
import planetRouter from './routes/planetRouter';

const app = express();
const port = 3001;
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use('/starships', starshipsRouter);
app.use('/species', speciesRouter);
app.use('/planets', planetRouter);

export default app;
