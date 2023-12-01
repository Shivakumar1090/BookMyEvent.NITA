const Events = require('../../models/event');
const deLinkFile = require("../../utility/deLinkFile");

const Delete_Event = async(req,res) => {
    try{
        const {id} = req.params;
        let deleteEvent = await Events.findById(id).exec();

        await Events.findByIdAndDelete(id);
        
        if(deleteEvent?.picture)
            deLinkFile("uploads/"+deleteEvent.picture);

        res.json({Message: "success"});
    } catch(err){
        console.error(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}   

module.exports = Delete_Event;