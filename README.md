# 🚀 Full Stack GraphQL Auth Boilerplate

[![CircleCI](https://circleci.com/gh/pearce89/graphql-auth.svg?style=shield)](https://circleci.com/gh/pearce89/graphql-auth)

<img src="https://raw.githubusercontent.com/pearce89/graphql-auth/master/screenshot.png" width="400">

### Backend side:

- [node](https://nodejs.org/en/)
- [graphql](https://graphql.org/) with [apollo server](https://www.apollographql.com/docs/apollo-server/)
- [graphql-shield](https://github.com/maticzav/graphql-shield)
- [knex](https://knexjs.org/)
- [objection](https://vincit.github.io/objection.js/)
- [babel](https://babeljs.io/)
- [jest](https://jestjs.io/)

### Frontend side:

- [vue](https://vuejs.org)
- [nuxt](https://nuxtjs.org)
- [tailwindcss](https://tailwindcss.com)

### Devops part:

- [circleci](https://circleci.com/gh/pearce89/workflows/graphql-auth) setup
- automated [backend](https://graphql-auth-backend.herokuapp.com/) and [frontend](https://graphql-auth.herokuapp.com/) deploy to **heroku**

### Features:

- Bits and pieces for your graphql schema with [schemaglue](https://github.com/nicolasdao/schemaglue)
- Number of npm tasks for Rails fans:

```
npm run db:create
npm run db:seed
npm run db:migrate
npm run db:clear
npm run db:drop
```

- Nice and easy [permissions](https://github.com/pearce89/graphql-auth/blob/master/server/src/app/graphql/story/permissions.js) with [graphql-shield](https://github.com/maticzav/graphql-shield)
- Errors [codes](https://github.com/pearce89/graphql-auth/tree/master/server/src/app/errors) logic
- Separate [place](https://github.com/pearce89/graphql-auth/tree/master/server/src/app/services) for your business logic
- [Easy setup](https://github.com/pearce89/graphql-auth/blob/master/docker-compose.yml) with Docker and Docker Compose

---

### [How to get up and running on local machine](https://github.com/pearce89/graphql-auth/wiki/How-to-get-up-and-running)

