const nodemailer = require('nodemailer');

// Use services such as postmark or sendgrid for prod
// Use ethereal - fake SMPT mailer for dev
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  console.log(event, context);

  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: 'orders@example.com',
    subject: 'New Order!',
    html: `<p>Your new pizza order is here! </p>`,
  });

  console.log(info);

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
