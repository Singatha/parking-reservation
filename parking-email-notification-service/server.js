const nodemailer = require('nodemailer');
const Redis = require('ioredis');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'test',
  auth: {
    user: 'test@test.com',
    pass: 'test',
  },
});

// Redis setup
const redis = new Redis(6379, "redis-publisher");

// Define the Redis channel to subscribe to
const redisChannel = 'email-notifications';

// Subscribe
redis.subscribe(redisChannel, (err, count) => {
  if (err) {
    console.error('Failed to subscribe to Redis channel');
  } else {
    console.log(`Subscribed to ${count} channels`);
  }
});

redis.on('message', (channel, message) => {
  console.log(message, "from subscriber");
  // Parse the message into an object
  const emailData = JSON.parse(message);

  // Send the email
  sendEmail(emailData);
});

// Send Email
async function sendEmail(emailData) {
  // Load the email template
  const template = await loadEmailTemplate('./email-templates/email-template.hbs', emailData);

  // Send the email
  await transporter.sendMail({
    from: 'test@test.com',
    to: 'test@test.com',
    subject: 'Email Sent via Pub/Sub',
    html: template,
  });

  console.log(`Email sent to ${emailData.to}`);
}

// Load Email Template
const fs = require('fs').promises;
const handlebars = require('handlebars');

async function loadEmailTemplate(templateName, data) {
  const templateContent = await fs.readFile(templateName, 'utf-8');
  const compiledTemplate = handlebars.compile(templateContent);
  return compiledTemplate(data);
}
