import { getAllFilms, getDataByUrl } from '../services/swapi';

const getClassifications = async (episodeNumber: number) => {
  // for now, lets assume this endpoint returns all the films
  const allFilms = await getAllFilms();
  const matchingFilm = allFilms.find(
    (ep: { episode_id: Number }) => ep.episode_id === episodeNumber
  );

  if (matchingFilm && matchingFilm.species.length) {
    const classifications: string[] = [];
    await Promise.all(
      matchingFilm.species.map(async (sp: string) => {
        const speciesRes = await getDataByUrl(sp);
        if (
          speciesRes &&
          speciesRes.classification !=='"unknown' &&
          !classifications.includes(speciesRes.classification)
        ) {
          classifications.push(speciesRes.classification);
        }
      })
    );
    return classifications;
  }
};

export default getClassifications;
