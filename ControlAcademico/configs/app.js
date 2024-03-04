import express  from "express"
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from "dotenv"
import classRoutes from '../src/class/class.routes.js'
import studentRoutes from '../src/student/student.routes.js'
import teacherRoutes from '../src/teacher/teacher.routes.js'

const app = express()
config()
const port = process.env.PORT || 3200

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use('/class', classRoutes)
app.use('/student', studentRoutes)
app.use('/teacher', teacherRoutes)

export const initServer = ()=>{
    app.listen(port)
    console.log(`SERVER HTTP RUNNIG IN PORT ${port}`)
}