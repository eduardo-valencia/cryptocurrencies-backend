# Cryptocurrencies

This project is a microservices application that helps users view cryptocurrency prices and statistics. You can view the website using the link below:

https://crypto.supercoder.dev/

## Architecture

This application is divided into the following microservices:

- Cryptocurrencies: allows users to favorite cryptocurrencies

Each microservice has a folder. Additionally, this repository stores `common`, which is a package that contains all related information between services.

## Development / Deployment Instructions

### Installations

This application uses Docker, Kubectl, and Skaffold to run the microservices. The following are the installation instructions for each of these:

- [Docker](https://www.docker.com/get-started)
- [Kubectl](https://kubernetes.io/docs/tasks/tools/): This application was last tested with Kubectl's client and server version v1.28.2.
- [Skaffold](https://skaffold.dev/docs/install/)

Additionally, this application uses Ingress for distributing traffic between services. Read Ingress's [installation instructions](https://kubernetes.github.io/ingress-nginx/deploy/). If you installed Docker Desktop, make sure to follow the article's instructions for it.

### Firebase

This project also uses Firebase for authentication, so you will need a Firebase Admin SDK service account. To get one, create a new Firebase project at https://firebase.google.com. Then, go to Project settings > Service accounts and click "Generate new private key." Save the file on your computer.

### App-Specific Instructions

Before starting the application, please read each microservice's `README.md` file for any additional prerequisites.

### Starting The App

Start the app in development mode by running the following command:

```bash
skaffold dev --filename=skaffold-dev.yaml
```

## Credits

Engineered by Eduardo Valencia (https://supercoder.dev).
