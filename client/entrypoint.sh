#!/bin/bash

if [ ! -f config/$NODE_ENV.env ]; then
  cp config/example/$NODE_ENV.env.example config//$NODE_ENV.env
fi

exec "$@"
