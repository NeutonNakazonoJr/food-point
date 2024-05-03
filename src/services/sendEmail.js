const transport = require('../config/email.js');    

async  function emailSender(toEmail, subject, emailContent) {
    await transport.sendMail({
        from: `${process.env.EMAIL_NAME} < ${process.env.EMAIL_FROM} >`,
        to: `${toEmail}`,
        subject: subject,
        html: emailContent
    })
}

module.exports = emailSender;