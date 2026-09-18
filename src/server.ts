import app from "./app"
import config from "./config";
import { prisma } from "./lib/prisma";
const port = config.port

const main = async() =>{
    try{
        await prisma.$connect()
        console.log('Connected to the database successfully');
        app.listen(port,()=>{
          console.log(`Running from ${port} port`);
        })
    }
    catch(error){
        console.log('Error occured',error);
        await prisma.$disconnect()
        process.exit(1)
    }
}

main()