const { BASE_URL } = require("./client");

const ADD_EVENT = BASE_URL+"/events";
const GET_EVENTS = BASE_URL+"/events/";
const DELETE_EVENT = BASE_URL+"/events/";
const UPDATE_EVENT  = BASE_URL+"/events/";

export { 
    ADD_EVENT,
    GET_EVENTS,
    DELETE_EVENT,
    UPDATE_EVENT
};