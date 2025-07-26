import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registerUser = async(req,res) =>{
   const {name,email,mobile,password,gender,country,state} = req.body;

   const hashedPassword = await bcrypt.hash(password,10)

   try {
      const isExistEmail = await userModel.findOne({email})
      if(isExistEmail){
         return res.json({
               success:false,
               message:"Email already exists"
            })
      }

      const isExistMobile  = await userModel.findOne({mobile})
      if(isExistMobile){
         return res.json({
            success:false,
            message:"Mobile number already exist"
         })
      }

      const newUser = new userModel({
         name,
         email,
         country,
         state,
         mobile,
         gender,
         password : hashedPassword
      })

      await newUser.save();

      return res.json({
         success:true,
         message:"User registered successfully"
      })
   } catch (error) {
      console.log(error)
      return res.json({
         success:false,
         message:"Something went wrong"
      })
   }
}

const loginUser = async(req,res) =>{
   const {email , password , mobile , otp} = req.body;
   try {
      let user;
      if(email && password){
         user = await userModel.findOne({email})
         if(!user){
            return res.json({
               success:false,
               message:"User not found"
            })
         }

         const isMatch = await bcrypt.compare(password,user.password)
         if(!isMatch){
            return res.json({
               success:false,
               message:"Incorrect password"
            })
         }
       
      }   else if (mobile && otp) {
         user = await userModel.findOne({ mobile });
         if (!user || otp !== user.otp || new Date() > user.otp_expiry) {
           return res.status(401).json({ message: 'Invalid mobile number or OTP' });
         }
      }  else {
         return res.status(400).json({ message: 'Invalid login credentials' });
       }
   
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
         expiresIn: '1h',
       });

   
       return res.json({
         success:true,
         message:"User logged in successfully",
         token,
         user
       });
       
   } catch (error) {
      console.log(error)
      return res.json({
         success:false,
         message:"Something went wrong"
      })
   }
}

const getSingleUser = async(req,res) =>{
    const id = req.params.id;
    try {
      const user = await userModel.findById(id)
      .populate("schemes_applied")
      .populate("grievances")
      .exec();

      if(!user){
         return res.json({
            success:false,
            message:"User not found"
         })
      }

      return res.json({
         success:true,
         user
      })
    } catch (error) {
      console.log(error)
      return res.json({
         success:false,
         message:"Something went wrong"
      })
    }
}

const getAllUser = async(req,res) =>{
   try {
      const users = await userModel.find({});
      return res.json({
         success:true,
         users
      })
   } catch (error) {
      console.log(error)
      return res.json({
         success:false,
         message:"Something went wrong"
      })
   }
}

export {registerUser,loginUser ,getAllUser ,getSingleUser}