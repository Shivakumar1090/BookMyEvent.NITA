import React,{useEffect} from "react";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import axios from "axios";
import { useSelector } from "react-redux";
const DOMAIN = process.env.REACT_APP_DOMAIN;

const EventDetails = () => {
    const {state} = useLocation();
    // const {data} = state?.data;
    // console.log(data);

    const userInfo =JSON.parse(window.localStorage.getItem("user"));
    console.log(userInfo);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
    }, []);

    const openPayModal = () => {
        var amount = state.data?.ticketPrice * 100; // Razorpay considers the amount in paise
    
        var options = {
          "key": "rzp_test_mlAUgaq5txbLxA",
          "amount": 0, // 2000 paise = INR 20, amount in paisa
          "name": state?.data?.name,
          "description": "",
          'order_id':"",
          "handler": function(response) {
              console.log(response);
              var values ={
                  razorpay_signature : response.razorpay_signature,
                  razorpay_order_id : response.razorpay_order_id,
                  transactionid : response.razorpay_payment_id,
                  transactionamount : amount,
                  userId: userInfo._id,
                  eventId: state?.data?._id,
                  email: userInfo.email,
                }
              axios.post('http://localhost:3002/amount/payment',values)
              .then(res=>{alert("Success")})
              .catch(e=>console.log(e))
          },
          "prefill":{
              "name": userInfo.name,
              "email": userInfo.email,
              "contact":'1234567890',
          },
          "notes": {
            "address": "Hello World"
          },
          "theme": {
            "color": "#528ff0"
          }
        };
        axios.post('http://localhost:3002/amount/order',{amount:amount})
            .then(res=>{
                options.order_id = res.data.id;
                options.amount = res.data.amount;
                console.log(options)
                var rzp1 = new window.Razorpay(options);
                rzp1.open();
            })
            .catch(e=>console.log(e))
    };

    return ( 
        <div>
            <Box style={flexBoxCentered} marginTop= '100px'>
                <img src={`${DOMAIN}/${state.data?.picture}`} alt='' style={img}></img>
                <Stack direction='row' spacing={3} marginTop='10px'>
                    <Typography variant="h6">{state?.data?.name}</Typography>
                    <Divider orientation="vertical" flexItem />
                    <Box display='flex'>
                        <PlaceOutlinedIcon style={{fontSize: '25px'}}/>
                        <Typography variant="h6" >{state.data?.venue}</Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box display='flex'>
                        <CurrencyRupeeOutlinedIcon style={{fontSize: '25px'}}/>
                        <Typography variant="h6" >{state.data?.ticketPrice}</Typography>
                    </Box>
                </Stack>
                <Box marginTop='10px' style={flexBoxCentered}>
                    <Typography variant="h6">
                        Join Your hands and make our event so graceful ! Then why you are late just press the below button and make payment.
                    </Typography>
                    <Button 
                        variant="outlined" 
                        endIcon={<ArrowForwardOutlinedIcon />}
                        onClick={()=>openPayModal()}
                        // marginTop="20px"
                    >
                        Register for event
                    </Button>
                </Box>
                {state?.data?.oraganizers && 
                    <Box>
                        <Typography variant="h5">Organziers for this event are</Typography>
                        <Box>
                            
                        </Box>
                    </Box>
                }

            </Box>
        </div>
     );
}

const flexBoxCentered = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const img = {
    // width: '70%',
    width: '120vh',
    height: '50vh',
    borderRadius: '10px',
    objectFit: 'cover',
}


const btn = {
    width: '350px',
    background: '#791314',
    color: '#fff',
    padding: '10px',
    marginTop: '1px',
    fontSize: '18px',
    textTransform: "capitalize",
}

 
export default EventDetails;