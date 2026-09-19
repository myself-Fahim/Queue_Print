import cookieParser from 'cookie-parser'
import express, { Application, Request, Response, urlencoded } from 'express'
import config from './config'
import cors from 'cors'
import { authRoute } from './modules/auth/auth.route'
const app : Application = express()


//App's default middleware
app.use(cors({
    origin:config.app_url,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended:true}))

// Apps default api
app.get('/',(req :Request,res:Response)=>{
    res.send('Server is running')
})

// Apps route middleware
app.use('/api/auth',authRoute)



export default app