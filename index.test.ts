import { describe, expect, test } from '@jest/globals';
import fetch from 'node-fetch';
import request from 'supertest';
import app from './index';
import { mockResults } from './mockApi';
jest.mock('node-fetch');

describe('Test get starships', () => {
  (fetch as jest.MockedFunction<typeof fetch>)
    .mockResolvedValueOnce(mockResults('/people/Luke Skywalker'))
    .mockResolvedValueOnce(mockResults('/starships/12'))
    .mockResolvedValueOnce(mockResults('/starships/22'));
  test('Get Starships - Luke', async () => {
    // positive scenario
    return request(app)
      .get('/starships?name=Luke%20Skywalker')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.header['content-type']).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              model: expect.any(String),
              manufacturer: expect.any(String),
              cost_in_credits: expect.any(String),
              length: expect.any(String),
              max_atmosphering_speed: expect.any(String),
              crew: expect.any(String),
              passengers: expect.any(String),
              cargo_capacity: expect.any(String),
              consumables: expect.any(String),
              hyperdrive_rating: expect.any(String),
              MGLT: expect.any(String),
              starship_class: expect.any(String),
              created: expect.any(String),
              edited: expect.any(String),
              url: expect.any(String),
              pilots: expect.arrayContaining([expect.any(String)]),
              films: expect.arrayContaining([expect.any(String)]),
            }),
          ])
        );
      });
  });
  // negative scenario
  test('Get Starships - Leia', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(
      mockResults('/people/Leia')
    );
    return request(app)
      .get('/starships?name=Leia')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe(
          'Could not find any starships for this search'
        );
      });
  });
});

describe('Test species classification', () => {
  (fetch as jest.MockedFunction<typeof fetch>)
    .mockResolvedValueOnce(mockResults('/films'))
    .mockResolvedValueOnce(mockResults('species/1'))
    .mockResolvedValueOnce(mockResults('species/2'))
    .mockResolvedValueOnce(mockResults('species/3'))
    .mockResolvedValueOnce(mockResults('species/4'))
    .mockResolvedValueOnce(mockResults('species/5'));
  test('Get classification of species in episode 4', async () => {
    return request(app)
      .get('/species/classifications?episodeNumber=4')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.header['content-type']).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual(
          expect.arrayContaining([expect.any(String)])
        );
      });
  });
});

describe('test population', () => {
  (fetch as jest.MockedFunction<typeof fetch>)
    .mockResolvedValueOnce(mockResults('/planets1'))
    .mockResolvedValueOnce(mockResults('/planets2'))
    .mockResolvedValueOnce(mockResults('/planets3'))
    .mockResolvedValueOnce(mockResults('/planets4'))
    .mockResolvedValueOnce(mockResults('/planets5'))
    .mockResolvedValueOnce(mockResults('/planets6'));
  test('Get population', async () => {
    return request(app)
      .get('/planets/population')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.header['content-type']).toMatch(/json/);
        expect(response.body).toStrictEqual({
          population: 1711401432500,
        });
      });
  }, 60000);
});
