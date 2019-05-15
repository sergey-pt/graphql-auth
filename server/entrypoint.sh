#!/bin/bash -e
cp -r /cache/node_modules/. /graphql-auth-server/node_modules/
exec npm run dev
