const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    name: String,
    picture: String,
    venue: String,
    date: String,
    budget: Number,
    collectedAmount: Number,
    ticketPrice: String,
    oraganizers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    attendees: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: "users",}
    ],
})

const Events = mongoose.model("Events" , EventSchema);
module.exports = Events;