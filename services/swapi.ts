import fetch from 'node-fetch';
const BASE_URL = 'https://swapi.dev/api';

const callSwapi = async (url: string) => {
  const response = await fetch(url, {});
  const res = await response.json();
  if (res.results) {
    const results = res.results;
    if (res.next) {
      const nextRes = await callSwapi(res.next);
      results.push(...nextRes);
    }
    return results;
  }
  return res;
};

export const getPeopleByName = async (name: string) => {
  return callSwapi(`${BASE_URL}/people?search=${name}`);
};

export const getAllFilms = async () => {
  return callSwapi(`${BASE_URL}/films`);
};

export const getAllPlanets = async () => {
  return callSwapi(`${BASE_URL}/planets`);
};

export const getDataByUrl = async (url: string) => {
  const response = await fetch(url, {});
  const res = await response.json();
  if (res.results) {
    const results = res.results;
    if (res.next) {
      const nextRes = await callSwapi(res.next);
      results.push(...nextRes);
    }
    return results;
  }
  return res;
};

