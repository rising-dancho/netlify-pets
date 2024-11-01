const cookie = require('cookie');

const handler = async (event) => {
  // console.log(event.headers.cookie);

  const body = JSON.parse(event.body || '');
  if (body.username === 'learn' && body.password === 'javascript') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true }),
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
