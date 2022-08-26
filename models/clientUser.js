import {mongoose} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const clientUserSchema=mongoose.Schema({
    name: { type: "String", required: true,unique: true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "freelanceUser" },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true
    },
    clientToken:{
        type: 'string',
    },
    freelancers: {
        type: 'array'
    }
})

clientUserSchema.pre('save', async function(next) {
    const clientuser =this;
    if(clientuser.isModified('password')) {
        clientuser.password = await bcrypt.hashSync(clientuser.password,10);
    }
    
    next();

})


clientUserSchema.statics.findByCredentials= async function(email,password) {
    const clientuser = await clientUser.findOne({email});
    if(!clientuser){

         throw new Error('Invalid credentials');
    }
    const passwordMatch = await bcrypt.compareSync(password, clientuser.password);
    if(!passwordMatch){
        throw new Error('Invalid credentials');
    }
    return clientuser;
}


clientUserSchema.methods.generateToken=async function(){
    const clientuser =this;
    const clientToken = await jwt.sign({_id: clientuser._id},process.env.SECRET_KEY);
    clientuser.clientToken = clientToken;
    await clientuser.save();
    return clientToken;
}
clientUserSchema.methods.toJSON= function(){
    const clientuser =this;
    const clientuserObject=clientuser.toObject();
    delete clientuserObject.password;
    delete clientuserObject._id;
    return clientuserObject;
}
export const clientUser = mongoose.model('clientUser',clientUserSchema);
