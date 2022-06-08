import express from "express";
import "dotenv/config";
import connectDb from "./utils/dbConn.js";
import blogRouter from "./routers/blogRoute.js";
import authRouter from "./routers/authRouter.js";
import cors from "cors";
import path from "path";
const app = express();
const port = process.env.PORT || 8000;
connectDb();
app.use(cors());
app.use(express.json());
app.use("/api", blogRouter);
app.use("/api/user", authRouter);

if(process.env.NODE_ENV == "production")
{
  app.use(express.static("frontend/build"))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
  })
}
app.listen(port, console.log(`app is running at port : ${port}`));
