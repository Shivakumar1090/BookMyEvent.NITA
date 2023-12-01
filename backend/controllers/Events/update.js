const Events = require('../../models/event');
const deLinkFile = require("../../utility/deLinkFile");

const Update_Event = async (req,res) => {
    console.log("edit");
    try{
        const {id} = req.params;
        
        if(req.file){
            req.body.picture = 'Events/'+req.file.filename;
        }

        let changingEvent = await Events.findById(id).exec();

        await Events.findByIdAndUpdate(id,req.body);

        if(req.file && changingEvent.picture)
            deLinkFile("uploads/" + changingEvent.picture);
        
        res.json({Message: "success"});
    } catch(err){
        console.error(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}

module.exports = Update_Event;