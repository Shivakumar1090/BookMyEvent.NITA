const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { transporter } = require("../../Keys/email_transporter");

const SendEmail = ({user}) => {
    // const {email , name} = user;
    const emailToken = jwt.sign(
        { _id: user._id },
        process.env.JWT_EMAIL,
        { expiresIn: "1d",}
    );

    //token url
    const url = `http://localhost:3000/verify_signup_email/${emailToken}`;

    transporter.sendMail(
    {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: "Email Verification",
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
                    <h3>hii ${user.name}!</h3>
                    <p>
                    Thank you for joining BookMyevent.NitA community. Please verify your email address by
                    clicking on below link.
                    </p>
                    <div style="text-align: center; margin-bottom: 20%; font-size: 1.5rem">
                    <a href=${url}>
                    <button
                        class="click_button"
                        style="
                            background-color: #c41d3c;
                            height: 3rem;
                            color: white;
                            font-weight: bold;
                            border-radius: 10px;
                            cursor: pointer;
                        "
                        variant="contained"
                        color="primary"
                        >
                        VERIFY EMAIL
                        </button>
                    </a>
                    
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

module.exports = SendEmail;