import dotenv from 'dotenv'
import path from 'node:path'
dotenv.config({path:path.join(process.cwd() , '.env')})


export default {
    port : process.env.PORT || 5000,
    database_url : process.env.DATABASE_URL,
    app_url : process.env.APP_URL,
    refresh_secret : process.env.JWT_REFRESH_TOKEN_SECRET!,
    refresh_timeline : process.env.JWT_REFRESH_TOKEN_TIMELINE,
    access_timeline : process.env.JWT_ACCESS_TOKEN_TIMELINE,
    access_secret : process.env.JWT_ACCESS_TOKEN_SECRET!
}