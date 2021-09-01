import admin from 'firebase-admin'

import app from './app'
import adapter from './services/pool'
import poolConfig from './config/pool'
import keys from './config/keys'

const getPrivateKeyWithReplacedEscapedKeys = (): string => {
  const { firebasePrivateKey } = keys
  return firebasePrivateKey.replace(/\\n/g, '\n')
}

const connectToFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: keys.firebaseProjectId,
      clientEmail: keys.firebaseClientEmail,
      privateKey: getPrivateKeyWithReplacedEscapedKeys(),
    }),
    databaseURL: 'https://cryptocurrencies-2759e.firebaseio.com',
  })
}

const setUp = async (): Promise<void> => {
  connectToFirebase()
  // Connect to database
  await adapter.connect({
    ...poolConfig,
    ssl: { rejectUnauthorized: false },
  })
  const port: number = keys.port || 5000
  app.listen(port, () => console.log(`Listening on ${port}`))
}

setUp()
