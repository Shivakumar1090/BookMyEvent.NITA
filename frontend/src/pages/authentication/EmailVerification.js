import React,{useState,useEffect} from "react";
import { Box, Typography } from "@mui/material";
import axios from 'axios';
import { useParams } from "react-router";
import { container } from "./styles";
import VerificationImage from '../../Assets/verification.jpg';

const EmailVerification = () => {
    let {token} = useParams(); 
    const [Name , setName] = useState("Shiva");

    useEffect(() => {
        axios.post("http://localhost:3002/user/verify_signup_email/" , { token: token })
            .then((response) => {
                console.log(response.data.name);
                setName(response.data.name);
                // setSuccess(true);
            })
            .catch(err => {
                console.log(err);
            })
    })

    return ( 
        <div>
            <Box style={container}>
                <img src={VerificationImage} alt="" height='350px'></img>
                <Typography variant="h5" fontWeight="semi-bold">Hi {Name}, Your email verification is successfull.</Typography>
            </Box>
        </div>
     );
}
 
export default EmailVerification;