import jwt from "jsonwebtoken";
import {clientUser} from "../models/clientUser.js"
import dotenv from "dotenv";
import { freelanceUser } from "../models/freelanceUser.js";
dotenv.config();
export const authclientUser = async (req, res, next) => {

    try {
        const userToken = req.header('Authorization').replace('Bearer ', "") ;
        const decodedToken = jwt.verify(userToken,process.env.SECRET_KEY);
        const user = await clientUser.findOne({_id: decodedToken._id});
        if(!user) {
            return res.status(404).json('please authenticate');
        }
        req.user=user;
        next();
    }catch(err) {
        console.log(err);
        res.status(500).send()
    }
}

export const authfreelanceUser = async (req, res, next) => {

    try {
        const userToken = req.header('Authorization').replace('Bearer ', "") ;
        const decodedToken = jwt.verify(userToken,process.env.SECRET_KEY);
        const user = await freelanceUser.findOne({_id: decodedToken._id});
        if(!user) {
            return res.status(404).json('please authenticate');
        }
        req.user=user;
        next();
    }catch(err) {
        console.log(err);
        res.status(500).send()
    }
}

