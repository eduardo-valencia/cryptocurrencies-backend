# Cryptocurrencies Microservice

The "Cryptocurrencies" microservice allows users to query information about cryptocurrencies and favorite them.

## Technologies

- PostgreSQL
- Node & Express

## Development / Deployment Instructions

### Running Locally

First, start your Postgres database. If you already have Postgres installed, you can run the following command on Ubuntu to start the database.

```bash
sudo service postgresql start
```

Second, please create a `.env` file with your environment variables. Read below to learn which environment variables you need. Finally, start the server in development mode:

```bash
yarn start:watch
```

### Pre-Requisites for Kubernetes

You will need a Firebase Admin SDK service account for authentication. To get one, create a new Firebase project at https://firebase.google.com. Then, go to Project settings > Service accounts and click "Generate new private key." All environment variables with "FIREBASE" refer to that service account.

Use kubectl to create a generic secret named `cryptocurrencies-postgresql-depl` with the following literal values:

- `POSTGRES_PASSWORD`: the PostgreSQL password. In development, this is `postgres`.

The following is an example:

```bash
kubectl create secret generic cryptocurrencies-postgresql-depl  --from-literal=POSTGRES_PASSWORD=postgres
```

Then, create a generic secret named `cryptocurrencies-depl` with the following literal values:

- `PUBLIC_URL`: The homepage's URL. Used for Cross-Origin Resource Sharing (CORS)
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`
- `DATABASE_URL`: The PostgreSQL database URL. When running the app using Skaffold, the URL is `postgres://postgres:<POSTGRES_PASSWORD>@cryptocurrencies-postgresql-srv.default.svc.cluster.local:5432/postgres`. Replace `<POSTGRES_PASSWORD>` with the value of the secret named `POSTGRES_PASSWORD`.
- `COIN_GECKO_API_KEY`: Visit [CoinGecko](https://www.coingecko.com/en/api) to get a demo API key.

The following is an example. Please note that you must fill in the placeholders.

```bash
kubectl create secret generic cryptocurrencies-depl \
  --from-literal=PUBLIC_URL=localhost:3002 \
  --from-literal=FIREBASE_PROJECT_ID=xxx \
  --from-literal=FIREBASE_PRIVATE_KEY=xxx \
  --from-literal=FIREBASE_CLIENT_EMAIL=xxx \
  --from-literal=DATABASE_URL=xxx \
  --from-literal=COIN_GECKO_API_KEY=xxx
```

## Development Configuration for Kubernetes

Normally, you would expect to load the application by visiting http://localhost. However, if you are running this application with Skaffold, then you will be using Ingress for distributing traffic between services. Ingress lets you set a specific domain, such as `example.com`, instead of `localhost` to navigate to the application.

This application is configured to use `crypto.test-server.cloud` as the development domain. To access the application in your browser, open your `/etc/hosts` (on MacOS) or `C:\Windows\System32\Drivers\etc\hosts` (on Windows) with a text editor **with administrator privileges**. Add a line at the bottom of the file with the following:

```
127.0.0.1 crypto.test-server.cloud
```

This means that `crypto.test-server.cloud` will point to 127.0.0.1 (also known as localhost). Using administrator privileges, save the file. You should now be able to access http://crypto.test-server.cloud in your browser.

Accessing the domain will send you a scary certificate security warning because it does not have a valid certificate. Since you are running the application locally, you do not have a valid HTTPS certificate. To ignore the warning in Google Chrome, type "thisisunsafe" in Google Chrome. See https://stackoverflow.com/questions/35274659/when-you-use-badidea-or-thisisunsafe-to-bypass-a-chrome-certificate-hsts-err/35275060#35275060 for more information.

## Commands

### Run the Tests

This command requires running the migrations first.

```bash
yarn test
```

### Start the Server (Production)

This command runs the migrations and starts the server in production mode. It requires building the application first.

```bash
yarn start
```

### Start the Server (Development Mode)

This command starts the server in watch/development mode.

```bash
yarn start:watch
```

### Migrate

This command is an alias for the `node-pg-migrate` package's binary. Run the command with `--help` for more information.

```bash
yarn migrate
```

### Build

This command builds the application.

```bash
yarn build
```
