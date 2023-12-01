import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import axios from "axios";
import { Button, Grid, Modal, Paper, TextField, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";

const { ADD_EVENT, GET_EVENTS, DELETE_EVENT, UPDATE_EVENT } = require("../../apis/events");

const DOMAIN = "http://localhost:3002";

const AdminPageForEvents = () => {
    // const user = useSelector(state => state.auth);
    const [Data, setData] = useState([]);
    const [selectedHover, setSelectedHovered] = useState(null);

    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const [Name, setName] = useState("");
    const [Image, setImage] = useState(null);
    const [venue, setVenue] = useState("");
    const [date, setDate] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");

    const [editName, setEditName] = useState("");
    const [editTicketPrice, setEditTicketPrice] = useState("");
    const [editVenue, setEditVenue] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editImg, setEditImg] = useState(null);
    const [pickedId, setPickedId] = useState("");

    useEffect(() => {
        axios.get(GET_EVENTS)
            .then(resp => setData(resp.data))
            .catch(err => console.log(err));
    },[])

    const deleteHandler = (id) => {
        console.log(id);
        axios.delete(DELETE_EVENT + id, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        })
            .then(() => {
                window.location.href = "/admin"
            })
            .catch(err => {
                console.log(err);
            })
    }

    const addHandler = (e) => {
        e.preventDefault();

        const newEvent = new FormData();
        newEvent.append("name", Name);
        newEvent.append("picture", Image);
        newEvent.append("venue", venue);
        newEvent.append("date", date);
        newEvent.append("ticketPrice", ticketPrice);
 
        axios
            .post(ADD_EVENT, newEvent, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                },
            })
            .then(() => {
                window.location.href = "/admin";
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const editHandler = (id) => {
        const editData = new FormData();
        editData.append("name", editName);
        editData.append("ticketPrice", editTicketPrice);
        editData.append("date", editDate);
        editData.append("venue", editVenue);
        editData.append("picture", editImg);

        axios.put(UPDATE_EVENT + id, editData, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        })
            .then(() => {
                window.location.href = "/admin";
            })
            .catch(err => {
                console.log(err);
            })
    }

    const editBox = (
        <Box style={ModalStyle}>
            <Typography style={heading}>Edit this Event</Typography>
            <TextField
                style={input}
                variant="standard"
                defaultValue={editName}
                label='Name'
                onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
                style={input}
                type="date"
                defaultValue={editDate}
                // label='date'
                variant="standard"
                onChange={(e) => setEditDate(e.target.value)}
            />
            <TextField
                style={input}
                defaultValue={editVenue}
                label='venue'
                variant="standard"
                onChange={(e) => setEditVenue(e.target.value)}
            />
            <TextField
                style={input}
                defaultValue={editTicketPrice}
                variant="standard"
                // multiline
                label='ticketPrice'
                onChange={(e) => setEditTicketPrice(e.target.value)}
            />
            <Box textAlign='left' padding='5px'>
                <input
                    type='file'
                    size='medium'
                    // value={editImg}
                    onChange={(e) => setEditImg(e.target.files[0])}
                />
            </Box>
            <Button
                onClick={() => editHandler(pickedId)}
                style={{ width: '200px', background: '#222', color: '#fff', marginTop: '10px' }}
            >Edit</Button>
        </Box>
    )

    const createBox = (
        <Box style={ModalStyle}>
            <Typography style={heading}>Create a new event</Typography>
            <TextField
                style={input}
                variant="standard"
                value={Name}
                label='Event Name'
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                style={input}
                variant="standard"
                value={ticketPrice}
                multiline
                label='Ticket price'
                onChange={(e) => setTicketPrice(e.target.value)}
            />
            <TextField
                style={input}
                variant="standard"
                value={venue}
                label='venue'
                onChange={(e) => setVenue(e.target.value)}
            />
            <TextField
                style={input}
                value={date}
                type = 'date'
                // label='date'
                onChange={(e) => setDate(e.target.value)}
            />
            <Box textAlign='left' padding='5px'>
                <input
                    type='file'
                    size='medium'
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </Box>
            <Button
                style={{ width: '200px', background: '#222', color: '#fff', marginTop: '10px' }}
                onClick={addHandler}
            >Add event</Button>
        </Box>
    )


    return (<>{window.localStorage.getItem("token") ?
        <Box padding='30px' marginTop='50px'>
            <Box display='flex' justifyContent='space-between'>
                <Typography style={heading}>Events</Typography>
                <Button style={addBtn} onClick={() => setOpenCreate(true)}>Add a Event</Button>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
                {
                    Data.map((event, hoverkey) => {
                        return (
                            <Grid item xs={6} key={event._id}>
                                <Paper style={row}
                                    key={event._id}
                                    hoverkey={event._id}
                                    elevation={hoverkey === selectedHover ? 3 : 0}
                                    onMouseOut={() => setSelectedHovered(null)}
                                    onMouseOver={() => setSelectedHovered(hoverkey)}
                                >
                                    <Box display='flex'>
                                        <img src={`${DOMAIN}/${event.picture}`} alt='..' style={img}></img>
                                        <Typography style={name} >{event.name}</Typography>
                                        <Box style={{ marginTop: 'auto', marginBottom: 'auto', }}>
                                            <Typography style={word}>{event.venue} </Typography>
                                            <Typography style={word} fontWeight='bold'>On {event.date}</Typography>
                                        </Box>
                                    </Box>
                                    <Box style={{ marginTop: 'auto', marginBottom: 'auto', }}>
                                        <Button onClick={() => {
                                            setEditName(event.name);
                                            setEditDate(event.date);
                                            setEditVenue(event.venue);
                                            setEditImg(event.picture)
                                            setEditTicketPrice(event.ticketPrice);
                                            setPickedId(event._id);
                                            setOpenEdit(true);
                                        }}
                                            style={{ padding: '5px', background: '#eb8546', color: '#fff', textTransform: "capitalize", marginRight: '12px' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            style={{ padding: '5px', background: '#ed4253', color: '#fff', textTransform: "capitalize", }}
                                            onClick={() => deleteHandler(event._id)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>{editBox}</Modal>
            <Modal open={openCreate} onClose={() => setOpenCreate(false)}>{createBox}</Modal>
        </Box> : <Navigate to="/" />}</>
    );
}

const row = {
    display: 'flex',
    padding: '10px',
    justifyContent: 'space-between',
    marginBottom: '15px',
    color: '#9B4F50',
    borderBottom: '1px solid #aaa',
    // borderRight: '1px solid #eee',
}

const addBtn = {
    fontSize: '17px',
    color: '#791314',
    textDecoration: 'underline',
    textTransform: "capitalize",
}

const name = {
    fontSize: '22px',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '10px',
}

const word = {
    fontSize: '15px',
    marginLeft: '15px',
}

const img = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
}

const heading = {
    fontWeight: "bold",
    fontSize: "30px",
    marginBottom: "15px",
};

const input = {
    margin: "7px",
    width: "400px",
    color: "#791314",
    // border: "1px solid #791314",
    // borderRadius: "5px",
    padding: "2px",
    background: '#fff',
};

const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: '#fff',
    border: "none",
    borderRadius: "3px",
    textAlign: 'center',
    color: "black",
    width: 400,
    p: 4,
    paddingLeft: "3rem",
    paddingRight: "3rem",
    paddingTop: '1rem',
    paddingBottom: '1rem',
}

export default AdminPageForEvents;