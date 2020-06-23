docker run --rm -ti oryd/hydra:v1.5 clients delete login-api --fake-tls-termination --endpoint http://192.168.10.3:4445
docker run --rm -ti oryd/hydra:v1.5 clients create --skip-tls-verify --fake-tls-termination --endpoint http://192.168.10.3:4445 \
   --id login-api \
   --secret ppp \
   --name "Login Api" \
   --grant-types client_credentials \
   --response-types token \
   --scope "*"


