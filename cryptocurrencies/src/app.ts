import app from '@supercoder.dev/backend-helpers/dist/utils/tests/app'
import cors from 'cors'

import mainRouter from './routes'

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.use(mainRouter)

export default app
