import React, { useState } from "react";
import { Box, Button, CircularProgress, FormLabel, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import cogoToast from 'cogo-toast';
import { Link } from "react-router-dom";

const {btn , form , container , title} = require('./styles.js');
const { REGISTER } = require('../../apis/user');

const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading , setLoading] = useState(false);

    const registerHandler = () => {
        setLoading(true);
        const newuser = {
            name: name,
            email: email,
            password: password,
        }

        axios.post(REGISTER, newuser)
            .then(async (res) => {
                await res.status === 200 ? cogoToast.success(res.data.Message): cogoToast.warn(res.data.Message);
                setLoading(false);
            })
            .catch(async (err) => {
                console.log(err);
                setLoading(false);
                cogoToast.error(err.response.data.Message);
            })
    }

    return (
        <Box style={container}>
            <Typography variant="h5" style={title}>Create your account</Typography>
            <Box style={form}>
                <Stack marginBottom='15px'>
                    <FormLabel>Name</FormLabel>
                    <TextField 
                        name="name"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Stack>
                <Stack marginBottom='15px'>
                    <FormLabel>Email</FormLabel>
                    <TextField 
                        name="email"
                        size="small"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Stack>
                <Stack marginBottom='10px'>
                    <FormLabel>Password</FormLabel>
                    <TextField 
                        type="password"
                        value={password}
                        name="password"
                        size="small"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Stack>
                <Button 
                    fullWidth 
                    variant="contained" 
                    style={btn}
                    onClick={registerHandler}
                >
                    {loading ? <CircularProgress style={{color: '#fff'}} size={25}/> : "Sign up"}
                </Button>
            </Box>
            <Typography style={{ fontSize: "15px", marginTop: '20px' }} >
                If you have account already then, {" "}
                <Link to="/login" style={{textDecoration: 'underline'}}>Login</Link>
            </Typography>
        </Box>
    );
}

export default Register;