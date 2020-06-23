#!/bin/bash
echo "corriendo en el puerto 10005"
docker run --rm -ti --name login-ui -v $(pwd)/src:/src --user $(id -u):$(id -g) -p 10005:4200 desarrollo-ui
