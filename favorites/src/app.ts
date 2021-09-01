import app from '@supercoder.dev/backend-helpers/dist/utils/tests/app'
import cors from 'cors'

import router from './routes'

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.use(router)

export default app
