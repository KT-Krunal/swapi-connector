import express from 'express';
import getPopulation from '../controller/planets';

const planetRouter = express.Router();
planetRouter.use(express.json());

planetRouter.route('/population').get(async (req, res) => {
  try {
    const population = await getPopulation();
    res.status(200);
    res.json(population);
  } catch (error) {
    res.statusMessage = JSON.stringify(error);
    res.status(500).send();
  }
});

export default planetRouter;
