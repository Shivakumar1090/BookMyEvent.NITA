import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormLabel, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import cogoToast from 'cogo-toast';
import { Link, useNavigate } from "react-router-dom";
import { UpdateUser } from "../../redux/actions/auth.js";

const {btn , form , container , title} = require('./styles.js');
const { LOGIN } = require('../../apis/user');

const Login = () => {
    // const Navigate = useNavigate();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const userDetails = useSelector((state) => state.auth);
    console.log(userDetails);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading , setLoading] = useState(false);
    const [rememberme , setRememberme] = useState(true);

    const LoginHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        const checkuser = {
            email: email,
            password: password,
            rememberme: rememberme,
        }

        axios.post(LOGIN, checkuser)
            .then(async (resp) => {
                console.log(resp?.data);
                dispatch(UpdateUser(resp?.data));
                window.localStorage.setItem("user" , JSON.stringify(resp.data.user));
                window.localStorage.setItem("token" , resp.data.token);
                await resp.status === 200 ? cogoToast.success("Successfully Logged in") : cogoToast.warn(resp.data.Message);
                setLoading(false);
                Navigate('/');
            })
            .catch(async (err) => {
                console.log(err);
                setLoading(false);
                cogoToast.error(err.response.data.Message || "couldn't login");
            })
            
    }

    return (
        <Box style={container}>
            <Typography variant="h5" style={title}>Sign in to your account</Typography>
            <Box style={form}>
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
                <FormControlLabel 
                    control={<Checkbox defaultChecked onChange={(e) => setRememberme(e.target.checked)}/>} 
                    label="Remember me!"
                />
                <Button 
                    fullWidth 
                    variant="contained" 
                    style={btn}
                    onClick={LoginHandler}
                >
                    {loading ? <CircularProgress style={{color: '#fff'}} size={25}/> : "Log In"}
                </Button>
            </Box>
            <Typography style={{ fontSize: "15px", marginTop: '20px' }} >
                Don't have an account ? {" "}
                <Link to="/register" style={{textDecoration: 'underline'}}>Signup</Link>
            </Typography>
        </Box>
    );
}
  

export default Login;