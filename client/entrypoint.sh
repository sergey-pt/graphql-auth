#!/bin/bash -e
cp -r /cache/node_modules/. /graphql-auth-client/node_modules/
exec npm run dev
