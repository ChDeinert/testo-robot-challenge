# testo-robot-challenge

Small coding challenge to show some code.  
(**The Frontend currently is not mobile friendly**)

**Live Demo**: [testo-robot-challenge](https://www.barbaric.dev/testo-robot-challenge/)

## Installation

1. Clone repository

2. Use the package manager [npm](https://www.npmjs.com) to install dependencies.

```bash
npm install
```

## Start

### in production mode

To start in production mode, run

```bash
npm start
```

the App will be available in your browser by visiting [http://localhost:9000](http://localhost:9000).

### in develop mode

To start in develop mode (with hotreload of codechanges,...), run

```bash
npm run develop
```

the App will be available in your browser by visiting [http://localhost:8000](http://localhost:8000).

### with cypress e2e tests

You can also start in develop mode and open cypress at the same time. To do this, run

```bash 
npm run test:e2e
```

This will make the App available in your browser on [http://localhost:8000](http://localhost:8000) and also open cypress where you can start the End-to-End tests

## Testing

This project has 2 different testing environments. One is running on Jest, the other one on [Cypress](https://www.cypress.io/).

To start the Jest based tests, run `npm test` or `npm run test:watch` to automatically run the tests on code chages.  
To start the Cypress based tests a single time without an window opening, run `npm run test:e2e:ci`.
If you prefer to have the cypress app opened to start the End-to-End tests, run `npm run test:e2e`, which will start the develop server as well.

Additionally eslint is installed, you can start it by running `npm run lint`.

## License
[MIT](https://choosealicense.com/licenses/mit/)
