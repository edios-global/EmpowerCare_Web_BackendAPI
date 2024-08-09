import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoute.js'
import dotenv from 'dotenv';
import MenuOption from './models/menuOptionModel.js';
import multiUserPermissionController from './routes/multiUserPermissionRoutes.js'
dotenv.config();
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/api', userRouter);
app.use('/api/mu/' ,  multiUserPermissionController )
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something Went Wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
app.use("/addMy", (req, res) => {


  MenuOption.bulkCreate([{
    MENU_NAME: 'Manage Users',
    USER_TYPE: 'Admin',
    SCREEN_NAME: 'Manage Users'
  },
  {
    MENU_NAME: 'Manage Profile Criteria',
    USER_TYPE: 'Admin',
    SCREEN_NAME: 'Manage Profile Criteria'
  },
  
  {
    MENU_NAME: 'Manage Facilities',
    USER_TYPE: 'Admin',
    SCREEN_NAME: 'Manage Facilities'
  },
  {
    MENU_NAME: 'Billing',
    USER_TYPE: 'Admin',
    SCREEN_NAME: 'Billing'
  },


])


  res.send('<h1>Server Running <h1>')
});
export default app