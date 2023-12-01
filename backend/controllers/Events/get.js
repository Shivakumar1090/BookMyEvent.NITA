const Events = require('../../models/event');

const Get_Events = async (req,res) => {
    try{
        Events.find()
            .then(data => res.json(data.reverse()))
            .catch(err => console.log(err));
    }catch(err){
        console.error(err);
        res.status(500).send({ Message: "Internal server error" });
    }
}

module.exports = Get_Events;