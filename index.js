import express from "express";
import {mongoose} from "mongoose";
import cors from "cors";
const app = express();
import dotenv from "dotenv";

import { clientUsersRouter } from "./routes/clientUser.js";
import { freelanceUsersRouter } from "./routes/freelanceUser.js";
import { projectRouter } from "./routes/Project.js";

// import { dressRouter } from "./routes/dress.js";
// import { usersRouter } from "./routes/users.js";
dotenv.config();

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

const MONGO_URL = process.env.MONGO_URL;


mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
  console.log("DB connected");
}).catch(error=>console.log(error));



app.get("/", function (req, res) {
  res.send("Hello World");
});

// app.use("/dress", dressRouter);
// app.use(usersRouter);
app.use(clientUsersRouter);
app.use(freelanceUsersRouter);
app.use(projectRouter)
app.listen(PORT, () => console.log(`App listening on  ${PORT}`));

