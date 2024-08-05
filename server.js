import app from "./app.js"
import config from "./config/config.js"
import colors from 'colors'
import { DBConnect } from "./dbConfig/dbConfig.js"
DBConnect()
app.listen(config.port,()=>{
    console.log(`Running on  port  ${config.port}` .rainbow  )
})