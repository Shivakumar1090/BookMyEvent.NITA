const crypto = require("crypto");
const Events = require('../../models/event');
const Transaction = require('../../models/transcation');
const KEY_SECRET = process.env.RAZORPAY_SECRET;
// const User = require("../../models/user");
const generateBookingTicketPDF = require("./mail/pdf");
const sendBookingTicketEmail = require('./mail/eventmail');

const Payment = async(req,res) => {
    console.log(req.body);
    try{
        const event = await Events.findById(req.body.eventId).exec();

    if (!event) {
        // Handle the case where the event is not found, e.g., return an error response.
        return res.status(404).send({ error: 'Event not found' });
    }

    if (!Array.isArray(event.attendees) || !event.attendees) {
        event.attendees = [];
    }

    await event.attendees.push(req.body.userId);

    // Use the 'update' method to update the 'attendees' array
    await Events.findByIdAndUpdate(req.body.eventId, { attendees: event.attendees }).exec();
    
    const pdfFilePath = 'booking_ticket.pdf';
    await generateBookingTicketPDF({
        event: event, // Assuming event contains booking details
        userId: req.body.userId,
        filePath: pdfFilePath,
    });
    
    const attachments = [{ filename: 'booking_ticket.pdf', path: pdfFilePath }];
    await sendBookingTicketEmail({
        email: req.body.email,
        attachments: attachments,
        event: event
    });
    res.send("done");
    } catch(err){
        console.log(err);
    }
    // const generated_signature = crypto.createHmac('sha256', KEY_SECRET);
    // generated_signature.update(req.body.razorpay_order_id+"|"+ req.body.transactionid);

    // if (generated_signature.digest('hex') === req.body.razorpay_signature){
    //     const transaction = new Transaction({
    //         transactionid:req.body.transactionid,
    //         transactionamount:req.body.transactionamount,
    //     });
    
    //     transaction.save()
    //         .then(async (savedTrans) => {    
    //             if (!Array.isArray(event.attendees) || !event.attendees) {
    //                 event.attendees = [];
    //             }

    //             await event.attendees.push(req.body.userId);

    //             // Use the 'update' method to update the 'attendees' array
    //             await Events.findByIdAndUpdate(req.body.eventId, { attendees: event.attendees }).exec();
                
    //             const pdfFilePath = 'booking_ticket.pdf';
    //             await generateBookingTicketPDF({
    //                 bookingDetails: event, // Assuming event contains booking details
    //                 userId: req.body.userId,
    //                 filePath: pdfFilePath,
    //             });
                
    //             const attachments = [{ filename: 'booking_ticket.pdf', path: pdfFilePath }];
    //             await sendBookingTicketEmail({
    //                 email: req.body.email,
    //                 attachments: attachments,
    //                 event: event
    //             });
    //             res.send({ transaction: savedTrans });
    //         })
    //         .catch(err => console.log(err));
    // }
    // else{
    //     return res.send('failed');
    // }
}

module.exports = Payment;