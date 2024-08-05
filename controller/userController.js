import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js";
import States from '../models/stateModel.js';


export const  addUser = asyncHandler( async (res , req)=>{

    // const fetchData = await User.findAll()
    // const user = await User.findByPk(1);
    try{
    
            // const result = await States.bulkCreate(gg)
            // const jane = await User.create({ 
            //     FIRST_NAME:"Sudhanshu1",
            //     LAST_NAME :"Dhiman1",
            //     USER_STATUS :"Active",
            //     EMAIL_ADDRESS :"sudhanshu@yopmail.com",
            //     PHONE_NUMBER :"+917060818373",
            //     MOBILE_OTP :"999999",
            //     PROFILE_STATUS :"Active",
            //     USER_TYPE :"Admin",
            //     PASSWORD:"22222222"
            //      });
        
                //  console.log("sadsadsadadsadsadfgdfgdfgdfgdfg" , result)
            req.send('<h1>Kuch ho rha ha<h1>')

    }catch( err){

    }



})