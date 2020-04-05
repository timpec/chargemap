# chargemap
Chargemap Task GraphQL version

## Mutations
To use mutations first create a user with post request to /user with username and password in body. Login to /auth/login with new users username and password in body and get the token. Then use the bearer token for authorization when mutating.