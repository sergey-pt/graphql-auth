#!/bin/bash

if [ ! -f src/config/$NODE_ENV.env ]; then
  cp src/config/example/$NODE_ENV.env.example src/config//$NODE_ENV.env
fi
