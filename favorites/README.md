# Favorites Microservice

The favorites microservice allows users to favorite cryptocurrencies.

## Technologies

- PostgresQL
- Node & Express

## Development / Deployment Instructions

### Pre-Requisites

You will need a Firebase Admin SDK service account for authentication. To get one, create a new Firebase project at https://firebase.google.com. Then, go to Project settings > Service accounts and click "Generate new private key." All environment variables with "FIREBASE" refer to that service account.

Use kubectl to create a secret with the following literal values:

- `PUBLIC_URL`: The homepage's URL. Used for Cross Origin Resource Sharing (CORS)
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`
- `POSTGRES_PASSWORD`: the PostgreSQL password for the "favorites-postgresql-depl" deployment.
- `DATABASE_URL`: The PostgreSQL database URL. When running the app using Skaffold, the URL is `postgres://postgres:<POSTGRES_PASSWORD>@localhost:5432/postgres`. Replace `<POSTGRES_PASSWORD>` with the the value of the secret named `POSTGRES_PASSWORD`.

## Development Configuration

Normally, you would expect to load the application by visiting http://localhost. However, if you are running this application with Skaffold, then you will be using Ingress for distributing traffic between services. Ingress lets you set a specific domain, such as `example.com`, instead of `localhost` to navigate to the application.

This application is configured to use `crypto.test-server.cloud` as the development domain. To access the application in your browser, open your `/etc/hosts` (on MacOS) or `C:\Windows\System32\Drivers\etc\hosts` (on Windows) with a text editor **with administrator privileges**. Add a line at the bottom of the file with the following:

```
127.0.0.1 crypto.test-server.cloud
```

This means that `crypto.test-server.cloud` will point to 127.0.0.1 (also known as localhost). Using administrator privileges, save the file. You should now be able to access http://crypto.test-server.cloud in your browser.

Accessing the domain will send you a scary certificate security warning because it does not have a valid certificate. Since you are running the application locally, you do not have a valid HTTPS certificate. To ignore the warning in Google Chrome, type "thisisunsafe" in Google Chrome. See https://stackoverflow.com/questions/35274659/when-you-use-badidea-or-thisisunsafe-to-bypass-a-chrome-certificate-hsts-err/35275060#35275060 for more information.
