import app from '@supercoder.dev/backend-helpers/dist/utils/tests/app'
import cors from 'cors'

import keys from './config/keys'
import router from './routes'

app.use(
  cors({
    origin: keys.publicUrl,
    credentials: true,
  })
)
app.use(router)

export default app
