import express from "express";
import mongoose from 'mongoose';
import {authclientUser,authfreelanceUser} from "../middleware/auth.js"
import { clientUser } from "../models/clientUser.js";
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

router.get("/getprojects", async function (req, res) {
    try {
        const project = await Project.find()
        res.status(200).send(project)
    }catch(err) {
         console.error(err);
        res.status(500).send()
    }
  })

  router.post('/freelanceapply',authfreelanceUser, async (req, res)=>{

    try {
        const {freelanceId,projectId}=req.body;
      const result= await Project.findOneAndUpdate({_id:mongoose.Types.ObjectId(projectId)},
        {$push:{
            freelancers:freelanceId
        }})
        res.status(200).send(result)
    }catch(err) {
         console.error(err);
        res.status(500).send()
    }
  })
  
  router.post('/freelancedecline',authfreelanceUser, async (req, res)=>{
  
    try {
        const {freelanceId,projectId}=req.body;
      const result= await Project.findOneAndUpdate({_id:mongoose.Types.ObjectId(projectId)},
        {$pull:{
            freelancers:freelanceId
        }})
        res.status(200).send(result)
    }catch(err) {
         console.error(err);
        res.status(500).send()
    }
  })




  export const projectRouter = router;