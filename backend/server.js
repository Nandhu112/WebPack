import  express  from "express";
import dotevn from "dotenv"
import {notFound,errorHandler} from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
dotevn.config();

import connectDB from "./config/db.js";
const port=process.env.PORT || 5000;
import userRoutes from "./route/userRoute.js"
import adminRoutes from "./route/adminRoute.js"
import hospitalRoutes from "./route/hospitalRoute.js"
import doctorRoute from "./route/doctorRoute.js"
import session from "express-session"


connectDB()

const app = express()  

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use('/api/hospitals',hospitalRoutes)
app.use('/api/doctors',doctorRoute)
app.use('/api/admin',adminRoutes)

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get('/' ,(req,res)=>res.send('server is running'))

app.use(notFound)
app.use(errorHandler)



app.listen(port,()=>console.log(`server is running ${port}`))