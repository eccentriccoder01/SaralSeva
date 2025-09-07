import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // clien id needed for google login

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
         password : hashedPassword,
         isComplete: true, // Mark local registration as complete
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

         // Check if the user registered via Google
         if (user.googleId) {
           return res.status(400).json({
             success: false,
             message:
               "This account uses Google login. Please use Google or mobile OTP.",
           });
         }

         // Ensure the user has completed registration
         if (!user.isComplete) {
           return res.json({
             success: false,
             message: "Please complete your registration first",
           });
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

// Google Login Handler
const googleLogin = async (req, res) => {
 
  const { id_token, isRegistering } = req.body;
  try {

    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID, 
    });

    const data = ticket.getPayload();
    if (data.aud !== process.env.GOOGLE_CLIENT_ID) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid audience" });
    }

    if (data.exp * 1000 < Date.now()) {
      return res.status(401).json({ success: false, message: "Token expired" });
    }

    const { sub: googleId, email, name } = data;
    let existingUser = await userModel.findOne({ email });

    if (existingUser && !existingUser.googleId) {
      if (isRegistering) {
        return res
          .status(400)
          .json({
            success: false,
            message: "User already exists. Please login instead.",
          });
      }
      return res.status(400).json({
        success: false,
        message: "This account uses email login. Please use your email & password or mobile OTP.",
      });
    }

    let user = await userModel.findOne({ googleId });

    if (user) {
      // Extra safety: check required fields along with isComplete
      if (
        user.isComplete &&
        user.mobile &&
        user.gender &&
        user.state &&
        user.country
      ) {
        if (isRegistering) {
          return res.status(400).json({
            success: false,
            message: "User already exists. Please login instead.",
          });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.json({
          success: true,
          message: "Logged in successfully",
          token,
          user,
        });
      } else {
        // Partial registration / missing info
        return res.json({ success: true, user, incomplete: true });
      }
    } else {
      if (isRegistering) {
        // Create new user only during registration
        user = new userModel({
          name,
          email,
          googleId,
          provider: "google",
          isComplete: false,
        });
        await user.save();
        return res.json({ success: true, user, incomplete: true });
      } else {
        // During login, do NOT create user
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Google authentication failed" });
  }
};

// Complete Registration for Google Users
const completeGoogleRegistration = async (req, res) => {
  const { googleId, mobile, gender, state, country } = req.body;
  try {
    const user = await userModel.findOne({ googleId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isExistMobile = await userModel.findOne({
      mobile,
      _id: { $ne: user._id },
    });

    if (isExistMobile) {
      return res.json({
        success: false,
        message: "Mobile number already exists",
      });
    }

    user.mobile = mobile;
    user.gender = gender;
    user.state = state;
    user.country = country;
    user.isComplete = true;

    await user.save();

    return res.json({
      success: true,
      message: "Registration completed successfully. Please login to continue.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to complete registration" });
  }
};

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

export {registerUser,loginUser ,googleLogin, completeGoogleRegistration,getAllUser ,getSingleUser}