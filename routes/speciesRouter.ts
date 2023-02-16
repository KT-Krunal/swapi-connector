import express from 'express';
import getClassifications from '../controller/classifications';

const speciesRouter = express.Router();
speciesRouter.use(express.json());

speciesRouter.route('/classifications').get(async (req, res) => {
  try {
    const episodeNumber = parseInt(req.query.episodeNumber as string);
    //this endpoint would return unique classifications of all species without any filter but for now,
    //requires fitler query param "episodeNumber" to be provided
    if(!episodeNumber || episodeNumber === 0) {
      res
      .status(422)
      .send({ message: 'query param "episodeNumber" is missing. Currently endpoint doesn\'t support fetching all classifications.'});
    }
    const classifications = await getClassifications(episodeNumber);
    if (classifications && classifications.length) {
      res.status(200).json(classifications);
    }
    res.status(404).send({ message: 'Could not find classifications for this episode species' });
  } catch (error) {
    res.statusMessage = JSON.stringify(error);
    res.status(500).send();
  }
});

export default speciesRouter;
