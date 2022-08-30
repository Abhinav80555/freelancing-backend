import express from "express";
import mongoose from 'mongoose';
import {authclientUser, authfreelanceUser} from "../middleware/auth.js"
import { freelanceUser } from "../models/freelanceUser.js";

const router = express.Router();


router.post('/freelanceuser',async(req,res)=>{
  try {
      const freelanceuser = await freelanceUser.create(req.body);
      await freelanceuser.generateToken();
      res.status(200).send()
  }catch(err) {
       console.error(err);
      res.status(500).send()
  }
})

router.post('/freelancelogin',async(req,res)=>{
  const{email, password} = req.body;
  try{
      const freelanceuser = await freelanceUser.findByCredentials(email, password);
      await freelanceuser.generateToken();
      res.status(200).send({
        _id: freelanceuser._id,
        name: freelanceuser.name,
        email: freelanceuser.email,
        password: freelanceuser.password,
        token: freelanceuser.freelanceToken,})
  }catch(err) {
       console.log(err);
      res.status(500).send()
  }
})

router.post('/auto-freelancelogin', authfreelanceUser, async (req, res) => {

  res.send(req.freelanceuser)

})

router.post('/freelancelogout',authfreelanceUser, async (req, res) => {
  const freelanceuser =req.freelanceuser;
  freelanceuser.token = '';
  await freelanceuser.save();
  res.status(200).send()
})





router.get("/freelanceuser/:id", async function (req, res) {

  try {
    const { id } = req.params;
    const result = await freelanceUser
    .findOne({ _id: mongoose.Types.ObjectId(id) });
     res.send(result) 
}catch(err) {
     console.error(err);
    res.status(500).send()
}
})





// router.post('/add-favorites',authUser, async (req, res)=>{

//   const {dressId}=req.body;
//   const user =req.user;
//   user.favorites.push(dressId);
//   await user.save();
//   res.status(200).send(user)

// })

// router.post('/remove-favorites',authUser, async (req, res)=>{

//   const {dressId}=req.body;
//   const user =req.user;
//   user.favorites = user.favorites.filter(id=>id !==dressId)
//   await user.save();
//   res.status(200).send(user)

// })


export const freelanceUsersRouter = router;
