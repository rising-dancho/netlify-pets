const isAdmin = require('../../our-library/isAdmin');
const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = cloudinary.config({
  cloud_name: 'dggewe2of',
  api_key: '769445293545881',
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

const handler = async (event) => {
  if (isAdmin(event)) {
    // current time when the script is going to be executed
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp: timestamp },
      cloudinaryConfig.api_secret
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timestamp: timestamp, signature: signature }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };
