docker run --rm -ti oryd/hydra:v1.5 clients delete login-ui --fake-tls-termination --endpoint http://192.168.10.3:4445
docker run --rm -ti oryd/hydra:v1.5 clients create --skip-tls-verify --fake-tls-termination --endpoint http://192.168.10.3:4445 \
    --id login-ui \
    --secret pppppppppp \
    --grant-types implicit \
    --response-types id_token,token,"id_token token" \
    --callbacks http://localhost:10005/auth/oauth2 \
    --scope openid,profile,offline,* \
    --client-uri https://localhost:10005
