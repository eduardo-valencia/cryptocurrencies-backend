import app from '@supercoder.dev/backend-helpers/dist/utils/tests/app'
import cors from 'cors'

import keys from './config/keys'
import router from './routes'

app.use(router)
app.use(
  cors({
    origin: keys.publicUrl,
    credentials: true,
  })
)

export default app
