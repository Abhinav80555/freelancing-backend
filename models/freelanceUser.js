import {mongoose} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const freelanceUserSchema=mongoose.Schema({
    name: { type: "String", required: true,unique: true},
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true
    },
    freelanceToken:{
        type: 'string',
    }
})

freelanceUserSchema.pre('save', async function(next) {
    const freelanceuser =this;
    if(freelanceuser.isModified('password')) {
        freelanceuser.password = await bcrypt.hashSync(freelanceuser.password,10);
    }
    
    next();

})


freelanceUserSchema.statics.findByCredentials= async function(email,password) {
    const freelanceuser = await freelanceUser.findOne({email});
    if(!freelanceuser){

         throw new Error('Invalid credentials');
    }
    const passwordMatch = await bcrypt.compareSync(password, freelanceuser.password);
    if(!passwordMatch){
        throw new Error('Invalid credentials');
    }
    return freelanceuser;
}


freelanceUserSchema.methods.generateToken=async function(){
    const freelanceuser =this;
    const freelanceToken = await jwt.sign({_id: freelanceuser._id},process.env.SECRET_KEY);
    freelanceuser.freelanceToken = freelanceToken;
    await freelanceuser.save();
    return freelanceToken;
}
freelanceUserSchema.methods.toJSON= function(){
    const freelanceuser =this;
    const freelanceuserObject=freelanceuser.toObject();
    delete freelanceuserObject.password;
    delete freelanceuserObject._id;
    return freelanceuserObject;
}
export const freelanceUser = mongoose.model('freelanceUser',freelanceUserSchema);