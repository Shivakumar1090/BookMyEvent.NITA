import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, Stack, Typography } from "@mui/material";
// import Navbar from "../components/Navbar";
import axios from "axios";
import HomeBg from "../Assets/bg.jpg";

import "../App.css";
// import Login from "./authentication/Login";
// import Register from "./authentication/Register";
import { useNavigate } from "react-router-dom";


const {GET_EVENTS} = require('../apis/events');

const Home = () => {
    const [data , setData] = useState([]);
    const Navigate = useNavigate();

    useEffect(() => {
        axios.get(GET_EVENTS)
            .then(resp => setData(resp.data))
            .catch(err => console.log(err));
    },[]);

    console.log(data);
    return ( 
        <Box>
            <Box style={container}>
            <div style={curveShape}></div>
            <Typography style={{color: '#fff'}} variant='h3' fontWeight='semi-bold'>Hey Come On, Book your Tickets</Typography>
            <Typography style={{color: '#fff'}} variant="h6">Join with us e booking platform at Nit agartala</Typography>
            <Stack direction='row' gap={2}>
                <Button 
                    variant="contained" 
                    onClick={() => Navigate(`/event/${data[0].name}` , {state: {data: data[0]}})}
                >
                    Book for {data[0]?.name}
                </Button>
                <Button variant="outlined">Login</Button>
            </Stack>
        </Box>
        </Box>
     );
}

const container = {
    position: 'relative',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),url(${HomeBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}

const curveShape = {
    // position: 'absolute',
    // bottom: '-50px',
    // left: '0',
    // width: '100%',
    // height: '100px',
    // background: '#fff',
    // borderRadius: '50% 110% 0 0',
}


export default Home;