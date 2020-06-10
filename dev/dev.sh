#!/bin/bash
echo "corriendo en el puerto 10002"
docker run --rm -ti --name login-ui -v $(pwd)/src:/src --user $(id -u):$(id -g) -p 10002:4200 desarrollo-ui
