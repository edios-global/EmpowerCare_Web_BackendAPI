
import dotenv from 'dotenv'
dotenv.config()
const local ={
port:5000,
db:{
    name :'empowercare',
    userName:'edteam',
    password:'ed$456',
    host:'192.168.5.52',
    type:'mysql',
    port:3308,

}
}
const production ={



}

let  config =   process.env.ENVIRONMENT === "LOCAL" ? local : production
export  default config