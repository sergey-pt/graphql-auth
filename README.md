# Full Stack GraphQL Auth Boilerplate

[![CircleCI](https://circleci.com/gh/pearce89/graphql-auth.svg?style=shield)](https://circleci.com/gh/pearce89/graphql-auth) [![Heroku App Status](https://heroku-shields.herokuapp.com/graphql-auth)](https://graphql-auth.herokuapp.com)

### Backend side:

- [node](https://nodejs.org/en/)
- [graphql](https://graphql.org/)
- [graphql-shield](https://github.com/maticzav/graphql-shield)
- [knex](https://knexjs.org/)
- [objection](https://vincit.github.io/objection.js/)
- [jest](https://jestjs.io/)

### Frontend side:

- [vue](https://vuejs.org)
- [nuxt](https://nuxtjs.org)
- [jest](https://jestjs.io/)

---

### How to get started:

There are two options to run this project on local machine:

1. Start **all** services via <ins>docker</ins>
    - Advantages:
        * Easy install
        * Cross-platform
    - Disadvantages:
        * Tricky integration with your local workflow cause' `node_modules` are not in sync between your containers and local machine unless you'll try some tweaks like this: [stackoverflow.com/questions/51097652](https://stackoverflow.com/questions/51097652/)
2. Start **db** service via <ins>docker</ins> and **node** applications via <ins>local install</ins>
    - Advantages:
        * Full integration with your local workflow: inspect `node_modules` and perform VS Code debugging without any additional efforts
    - Disadvantages:
        * Node.js should be installed on local machine (via [nvm](https://github.com/nvm-sh/nvm), [brew](https://brew.sh/) or any other way)
        * a little bit more steps to perform full local setup

#### Start all services via docker

1. Install docker on your local machine: [docker.com/community-edition#/download](https://www.docker.com/community-edition#/download)
2. Set up the `/etc/hosts` file. Your client container uses the following api url on server side rendering side, but it also should be available in browser context. Browser lives in your host system, that's why we need to setup this host: `echo "127.0.0.1 server.graphql-server.local" | sudo tee -a /etc/hosts`
3. Build your containers: `docker-compose build`
4. Enter the bash of server app: `docker-compose run --rm server --entrypoint /bin/bash`
5. Create the database: `npm run db:create`
6. Migrate the database: `npm run db:migrate`
7. Seed the database: `npm run db:seed`
8. Exit server's container bash: `exit`
9. Start your services `docker-compose up`

#### Start db service via docker and node applications via local install

1. Install docker on your local machine: [docker.com/community-edition#/download](https://www.docker.com/community-edition#/download)
2. Start database service: `docker-compose up postgres`
3. Install [node](https://nodejs.org/en/) via [nvm](https://github.com/nvm-sh/nvm), [brew](https://brew.sh/) or any other way
4. Install npm dependencies for <ins>root</ins> app: `cd graphql-auth && npm install`
5. Install npm dependencies for <ins>client</ins> app: `cd graphql-auth/client && npm install`
6. Install npm dependencies for <ins>server</ins> app: `cd graphql-auth/server && npm install`
7. Create the database: `cd graphql-auth/server && npm run db:create`
8. Migrate the database: `cd graphql-auth/server && npm run db:migrate`
9. Seed the database: `cd graphql-auth/server && npm run db:seed`
10. Start your services: `cd graphql-auth && npm run dev`
