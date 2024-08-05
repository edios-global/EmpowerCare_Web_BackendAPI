import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoute.js'
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/api' ,userRouter )
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something Went Wrong";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });
  app.use( "/" , (req, res) => {
 res.send('<h1>Server Running <h1>')
  });
  export default  app