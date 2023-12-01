const User = require("../../models/user")
const Joi = require('joi');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SendEmail = require('./sendEmail');

const validation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email : Joi.string().max(100).required().email(),
    password : Joi.string().min(6).required(),
})


const Register = async(req,res) => {
    const {
        error ,
        value: {email,password,name}
    } = validation.validate(req.body);

    try{
        if (error) return res.status(422).send({ Message: error.message })
        const {name,email,address,password,isOrganizer} = req.body;

        const user = await User.findOne({email: email}).exec();

        if(user){
            return res.status(401).json({ Message: 'Email is already present' });
        }

        const hashedPassword = await bcrypt.hash(password , 12);

        const newUser = new User({
            email,
            name,
            address,
            password : hashedPassword,
            isVerified: false,
            isAdmin: false,
            isOrganizer: false,
        });
        
        await SendEmail({user : newUser});

        await newUser.save();

        return res.json({ Message: "Verification Email has been sent to your given email."});
    }catch(err){
        console.error(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}

const Verify = async(req,res) => {
    const token = req.body.token.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_EMAIL, (err, payload) => {
        if (err) {
            //if error then ->
            return res.status(401).json({ error: "error occured" });
        }
        //get id of token user -->
        const { _id } = payload;
        //update isVerified to true
        User.findByIdAndUpdate(_id, { isVerified: true })
            .then(user => {
                const { name } = user;
                res.status(200).json({ name: name });
            })
            .catch(err => {
                console.log(err);
                return res.status(422).json({ message: "error occured !" });
            });
    });
}

module.exports = {Register , Verify};