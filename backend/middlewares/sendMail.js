const nodemailer = require('nodemailer');

async function sendMail(options) {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'uditcloud100@gmail.com',
          pass: 'uditcloud@06062005'
        }
    });

    const mailOptions = {
        from: 'uditcloud100@gmail.com',
        to: options.email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;
