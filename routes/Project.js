import express from "express";
import { authclientUser,authfreelanceUser } from "../middleware/auth.js";
import { Project } from "../models/project.js";
const router = express.Router();


router.post('/addproject',authclientUser,async(req,res)=>{
    try {
        const project = await Project.create(req.body);
        res.status(200).send(project)
    }catch(err) {
         console.error(err);
        res.status(500).send()
    }
  })

router.get("/getprojects",authfreelanceUser, async function (req, res) {
    try {
        const project = await Project.find()
        res.status(200).send(project)
    }catch(err) {
         console.error(err);
        res.status(500).send()
    }
  })


  export const projectRouter = router;