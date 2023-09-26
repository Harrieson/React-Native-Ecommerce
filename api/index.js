const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const crypto = require("crypto");
const nodemailer = require("nodemailer")
const cors = require("cors");
const jwt = require("jsonwebtoken")
const User = require("./models/user.model")
const Order = require("./models/oder.model")
const { GOOGLEPASS,GOOGLEUSER, MONGO_URL } =require("./.env")


const app = express();
const PORT = 8000;
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}). then(() => {
    console.log(`Connected to Mongo DB`)
}).catch((err) => {
    console.log(`Error connecting to Mongo DB`, err)
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
    auth:{
        user:GOOGLEUSER,
        pass:GOOGLEPASS
    }
    });

    const mailOptions = {
        from:"Ecom",
        to:email,
        subject:"Email Verification",
        text:`Please click the following link to verify you account : http://localhost:8000/verify/${verificationToken}`
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
    console.log("Error sending verification email", error)
    }
}

app.post("/register", async(req, res) => {
    try {
        const {name, email, password} = req.body;

        // check if the email is already registered

        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({message:"This email is already being used."})
        }

        //create new user now!

        const newUser = new User({name, email, password});

        //Create and store verification Token

        newUser.verificationToken = crypto.randomBytes(20).toString("hex")

        //Save the user
        await newUser.save();


        //send Verification email to the new user 
        sendVerificationEmail(newUser.email, newUser.verificationToken);
        res.status(201).json({
            message: "Registration successful, Please check your email for verification"
        })

        
    } catch (error) {
        console.log("error registering user", error)
        res.status(500).json({message: "Registration Failed"})
    }
})

//Verification endpoint.
app.get("/verify/:token", async(res, req) => {
    try {
        const token = req.params.token;

        const user = await User.findOne({verificationToken: token})

        //Find if the user is verified
        if(!user) {
            return res.status(400).json({message:"Invalid verification token"})
        }

        //Mark user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();
        res.status(200).json({message: "Email verified successfully"})
    } catch (error) {
        res.status(500).json({message: "Email Verification Failed"})
    }
})