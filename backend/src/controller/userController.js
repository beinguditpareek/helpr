import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'

export const registerUser = async (req,res)=>{
    try {
        console.log(req.body);
        const {name,email,password,location,role} = req.body
        
        

        if (!name || !email || !password || !location || !role){
             return res.status(400).json({
                success:false,
                message:"All fields are required"
             })
        }

        const existingUser = await userModel.findOne({email})
        if(existingUser ){
          return res.status(400).json({
            success:false,
            message:"Email already registered"
          })
        }

        const hashedPassword  = await bcrypt.hash(password,10)

        const user = await userModel.create({
            name,
            email,
            password:hashedPassword,
            location,
            role
        })
        return res.status(200).json({
            success:true,
            message:"User Created succssfully",
            user,
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:"error in register catch ",
            error:error.message,

        })
    }
}
// export default registerUser