const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { transporter } = require("../../../Keys/email_transporter");

const EventMail = ({email,attachments,event}) => {
    // const { , name} = user;

    transporter.sendMail(
    {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Congrats you are registered for this event",
        attachments: attachments,
        html: `<div style="background-color: #525759; color: white">
                <div
                    style="
                    margin: auto;
                    width: 80%;
                    border: 0px solid;
                    padding: 10px;
                    max-width: 500px;
                    "
                >
                    <h3>hii ${event.name}</h3>
                    <p>
                    Thank you for joining BookMyevent.NitA community. Please verify your email address by
                    clicking on below link.
                    </p>
                    <div style="text-align: center; margin-bottom: 20%; font-size: 1.5rem">
                   
                    
                    </div>

                    <div>THANK YOU</div>
                    BookMyEvent.NitA
                </div>
            </div>`,
        },
        (err, info) => {
            if (err) {
                //
                console.log(err);
            } else {
                console.log("email send : " + info.response);
            }
        }
    );
}   

module.exports = EventMail;