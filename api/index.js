import  express  from "express" 
import authRoutes from "./routes/auth.js"
import adminRoutes from "./routes/admin.js"
import studentRoutes from "./routes/student.js"

import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/student", studentRoutes)





app.listen(8800, ()=>{
    console.log("Connected!")
})