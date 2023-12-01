const User = require("../../models/user")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require('joi');

const JWT_SECRET = process.env.JWT_SECRET;
const SendEmail = require('./sendEmail');

const validation = Joi.object({
    email : Joi.string().max(100).required().email(),
    password : Joi.string().min(6).required(),
    rememberme : Joi.boolean(),
})

const Login = async (req,res) => {
    const {
        error ,
        value: {email,password , rememberme}
    } = validation.validate(req.body);

    if (error) return res.status(422).send({ Message: error.message });

    try{
        const {email , password , rememberme} = req.body;
        // console.log(req.body);
        const user = await User.findOne({email: email}).exec();

        if(!user){
            return res.status(401).json({ Message: 'Invalid Email' });
        }

        // if(user.isVerified === false){
        //     await SendEmail({user : user});
        //     return res.json({Message : "Email isn't verified. New Verification link has sent to your mail"})
        // }

        // Compare passwords
        const isMatch = await bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ Message: 'Wrong Password' });
        }

        const token = await jwt.sign({ _id: user._id }, JWT_SECRET);

        // Set remember me cookie if enabled
        if (rememberme) {
            res.cookie('rememberMe', 'true', { maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
        }
  
        return res.json({ Message: 'Login successful' , token , user});
    }catch(err) {
        console.error(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}

module.exports = Login;