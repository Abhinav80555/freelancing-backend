import express from "express";
import mongoose from 'mongoose';
import {authclientUser,authfreelanceUser} from "../middleware/auth.js"
import { clientUser } from "../models/clientUser.js";

const router = express.Router();


router.post('/clientuser',async(req,res)=>{
  try {
      const clientuser = await clientUser.create(req.body);
      await clientuser.generateToken();
      res.status(200).send()
  }catch(err) {
       console.error(err);
      res.status(500).send()
  }
})

router.post('/clientlogin',async(req,res)=>{
  const{email, password} = req.body;
  try{
      const clientuser = await clientUser.findByCredentials(email, password);
      await clientuser.generateToken();
      res.status(200).send(clientuser)
  }catch(err) {
       console.log(err);
      res.status(500).send()
  }
})

router.post('/auto-clientlogin', authclientUser, async (req, res) => {

  res.send(req.clientuser)

})

router.post('/clientlogout',authclientUser, async (req, res) => {
  const clientuser =req.clientuser;
  clientuser.token = '';
  await clientuser.save();
  res.status(200).send()
})




router.get("/clientuser/:id",authfreelanceUser, async function (req, res) {

  try {
    const { id } = req.params;
    const result = await clientUser
    .findOne({ _id: mongoose.Types.ObjectId(id) });
     res.send(result) 
}catch(err) {
     console.error(err);
    res.status(500).send()
}
})





router.post('/freelanceapply',authfreelanceUser, async (req, res)=>{

  const {freelanceId}=req.body;
  const user =req.clientuser;
  user.freelancers.push(freelanceId);
  await user.save();
  res.status(200).send(user)

})

router.post('/freelancedecline',authfreelanceUser, async (req, res)=>{

  const {freelanceId}=req.body;
  const user =req.clientuser;
  user.freelancers = user.freelancers.filter(id=>id !==freelanceId)
  await user.save();
  res.status(200).send(user)

})


export const clientUsersRouter = router;

