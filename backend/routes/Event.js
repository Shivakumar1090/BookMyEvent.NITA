const express = require('express');
const router = express.Router();

const { upload, storageEngine } = require("../utility/upload");
const outputFolder = "./uploads/events";

const Add_Event = require('../controllers/Events/add');
const Get_Events = require('../controllers/Events/get');
const Delete_Event = require('../controllers/Events/delete');
const Update_Event = require('../controllers/Events/update');

const uploadTag =  upload(storageEngine(outputFolder)).single("picture");

router.post('/' ,uploadTag, Add_Event);
router.get('/' , Get_Events);
router.delete('/:id' , Delete_Event);
router.put('/:id' ,uploadTag, Update_Event);

module.exports = router;