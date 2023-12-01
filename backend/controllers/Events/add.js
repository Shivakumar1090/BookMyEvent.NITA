const Events = require('../../models/event');

const Add_Event = async(req,res) => {
    try{
        const {name,venue,date,ticketPrice} = req.body;
        console.log("Hello" , req.body);
        const newEvent = new Events({
            name,
            venue,
            date,
            ticketPrice,
            picture: "Events/"+req?.file?.filename,
        });

        await newEvent.save();
        res.json({Message: "success"});
    } catch(err){
        console.error(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}

module.exports = Add_Event;