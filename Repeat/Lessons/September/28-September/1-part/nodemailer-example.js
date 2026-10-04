const nodemailer = require('nodemailer');
const {config} = require('dotenv');

config();

/**
 * Транспортер знает, как отправлять письма: через какой сервис и с каими данными
 * 
 */

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

const from = process.env.EMAIL_USER
const to = process.env.EMAIL_TO

function sendTextEmail() {
    const mailOptions = {
        from,
        to,
        subject: 'Test email send with node.js',
        text: 'Hi from Sergii. This email was send from node.js with help of nodemailer. P.S Please see the attached file.',
        attachments: [
            {
                filename:'file.txt',
                path: '.path/to/file.txt'
            }
        ]
    }
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.error('Error send email: ', error.message)
    }
    console.log('Email was send: ', info.response);
})
}



sendTextEmail()