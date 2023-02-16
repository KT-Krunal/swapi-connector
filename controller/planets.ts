import { getAllPlanets } from '../services/swapi';

const getPopulation = async () => {
  const planets = await getAllPlanets();
  let population = 0;
  planets.forEach((planet: { population: string }) => {
    population += parseInt(planet.population) || 0;
  });
  return { population };
};

export default getPopulation;
