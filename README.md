# aStream

## Dependencies
- Backend:
    - [flask](https://pypi.python.org/pypi/Flask)

- Frontend:
    - [AngularJS](https://angularjs.org)
    - [NodeJS](https://nodejs.org)
    - [Bower](http://bower.io)
    - others listed in [Node package](frontend/package.json) and [Bower](frontend/bower.json)

## Running

####backend

At fist, copy the `backend/astream.example.conf` as `backend/astream.conf` and properly edit it. Please do **not** commit this file to the repository.
Mount your music into `data` directory (or just copy some testing files here) and then run:

    python backend/run.py

Backend API is available via <http://0.0.0.0:5000/api> (if you have default settings)

####frontend

Folder `bin` is production build of client (standalone).
For first run rename file `bin/client/js/config.default.js` to `bin/client/js/config.js`
and run:

    node bin/server/production.js

Client is available via <http://localhost:8686> (if you have default settings)


## API

See the [API documentation](API.md)


## Frontend development manual

See the [Manual](frontend/README.md)

## Running instances
- Backend: <http://83.167.252.142:5000/>
- Frontend: None
