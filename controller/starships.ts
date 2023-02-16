import { getPeopleByName, getDataByUrl } from '../services/swapi';

const getStarships = async (name: string) => {
  const peopleResponse = await getPeopleByName(name);
  if (peopleResponse && peopleResponse.length) {
    const starships = peopleResponse[0].starships; // for now, lets assume first person is the best match for the search

    if (starships.length) {
      const starshipDetails: unknown[] = [];
      await Promise.all(
        starships.map(async (starship: string) => {
          const starshipResponse = await getDataByUrl(starship);
          starshipDetails.push(starshipResponse);
        })
      );
      return starshipDetails;
    }
  }
  return [];
};
export default getStarships;
