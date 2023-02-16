## swapi-connector
### Setup Instructions:
1. **Clone the repository**
      Run `git clone <url>`

2. **Install Modules**
      Run `npm install`

3. **Start server**
      Run `npm run start`

4. **Run test**
      Run `npm run test`

### INTRODUCTION

Star-wars-connector is a wrapper around publicly available and well known [star wars api](https://swapi.dev/). The purpose of this project is to query the star wars API to figure out how to beat the Galactic Empire. 

#### API ENDPOINTS
1. **Return a list of the Starships related to Star wars character**, for example: Luke Skywalker
  **API Endpoint**: `/starships?name={person}`

2. **Return the classification of all species in a particular episode**
  **API Endpoint**: `/species/classifications?episodeNumber=<number>`

3. **Return the total population of all planets in the Galaxy**
  **API Endpoint**: `/planets/population`
