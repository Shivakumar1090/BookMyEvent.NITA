const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    picture: String,
    address: {
        RoomNo : String,
        Block : String,
        Hostel: String,
    },
    email: String,
    password: String,
    isVerified : {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isOrganizer: {
        type: Boolean,
        default: false,
    },
    registered_events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Events",
        }
    ],
});

module.exports = mongoose.model("users" , UserSchema);
// module.exports  = User;