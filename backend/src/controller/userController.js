import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import statusCode from 'http-status-codes'
import jwt from 'jsonwebtoken'
export const registerUser = async (req,res)=>{
    try {
        // console.log(req.body);
        const { name,email,password,location,role} = req.body
        
        

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
        // console.log(error);
        
        return res.status(500).json({
            success:false,
            message:"error in register catch ",
            error:error.message,

        })
    }
}
// export default registerUser




// USER GET -------------------------

export const getAlluser = async (req,res) => {
try {
    const getAlluser = await userModel.find();
        return res.status(statusCode.OK).json({
        success:true,
        message:"User get successfully",
        getAlluser

    });
} catch (error) {
    return res.status(statusCode.BAD_REQUEST).json({
        success:false,
        message:"User can't get error in get api",
        error,

    })
}
}

// export default getAlluser



// LOGIN USER ----------------------------------------------------
export const loginUser = async(req,res)=>{
     try {
        const {email,password}= req.body

        if(!email || !password){
            return res.status(statusCode.BAD_REQUEST).json({
                success:false,
                message:"Email or password are required"

            })

        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(statusCode.NOT_ACCEPTABLE).json({
                success:false,
                message:"User not found",
            })
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(statusCode.BAD_REQUEST).json({
                success:false,
                message:"Invalid Password",

            })

        }

        const token = jwt.sign(
            { id: user._id },
           process.env.JWT_SECRET,
           { expiresIn: "7d" }
        );
         // *** THIS IS WHERE YOU ADD COOKIE CODE ***
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // local development
      sameSite: "lax",
    });

        return res.status(statusCode.OK).json({
            success:true,
            message:"User Login Succssfull",
            token,
            user,
        })
     } catch (error) {
        return res.status(statusCode.BAD_REQUEST).json({
            success:false,
            message:"Login Api error",
            error:error.message,
        })
        
     }
}