const nodemailer = require("nodemailer");

const sendEmail = async (receiver, subject, title, text, code) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: receiver,
            subject: subject,
            html: `
                <center><h3><font color="green"> ${title} </font></h3></center>
                <h3> ${text} </h3>
                <center><h1><font color="red"> ${code} </font></h1></center>
                `,
        };

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        await transporter.verify();
        console.log('SMTP connection verified');

        const info = await transporter.sendMail(mailOptions);
        console.log("Email Send Successfully to "+receiver);

        return info;
    } catch(err){
        console.error("Failed to send email : ", err);
        throw err;
    }
};

module.exports = sendEmail;