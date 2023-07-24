import express from 'express'
import indexRouter from './routes/index'
import HabitacionesRoutes from './routes/habitaciones'

const app = express()
const port = 4000

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api',indexRouter)
app.use('/api/habitaciones',HabitacionesRoutes)


app.listen(port, () => {
    console.log('Server is running on port ' + port)
})