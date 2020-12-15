const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>We will have your order ready in the next 20 mins.</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
      <img src="${item.thumbnail}" alt="${item.name}" />
      Size: ${item.size} Name: ${item.name} - ${item.price}
      </li>`
        )
        .join(' ')}
    </ul>
    <p>Your total is <strong>${total}</strong> due at pickup.</p>
    <style>
        ul {
          list-style: none;
        }
    </style>
  </div>`;
}

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
  const body = JSON.parse(event.body);

  // Check if honeypot was filled out
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Beep Bop Bop ERROR 999` }),
    };
  }

  // Check input validation
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `You are missing the ${field} field` }),
      };
    }
  }

  // Check that user order something
  if (body.order.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "You can't order nothing",
      }),
    };
  }

  const { name, email, order, total } = body;

  // send Email
  try {
    await transporter.sendMail({
      from: "Slick's Slices <slick@example.com>",
      to: `${name} <${email}>, orders@example.com`,
      subject: 'New Order!',
      html: generateOrderEmail({ order, total }),
    });
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email' }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
