const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //service that sends the email
  /* const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //activate i ngmail less secrue app option */
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'kanika arora <hello@kanika.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  // 3) Actually send the email
  //this returns a promise so we wuse asycnh await
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
