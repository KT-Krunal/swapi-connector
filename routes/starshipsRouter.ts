import express from 'express';
import getStarships from '../controller/starShips';

const starshipsRouter = express.Router();
starshipsRouter.use(express.json());

starshipsRouter.route('/').get(async (req, res) => {
  try {
    const name = req.query.name as string;
    
    //this endpoint would return all the starships without any filter but for now,
    //require fitler query param "name" to be provided
    if(!name) {
      res
      .status(422)
      .send({ message: 'query param "name" is missing. Currently endpoint doesn\'t support fetching all starships.'});
    }
    const starships = await getStarships(name);
    if (starships && starships.length) {
      res.status(200);
      res.json(starships);
    }
    res
      .status(404)
      .send({ message: 'Could not find any starships for this search'});
  } catch (error) {
    res.statusMessage = JSON.stringify(error);
    res.status(500).send();
  }
});

export default starshipsRouter;
