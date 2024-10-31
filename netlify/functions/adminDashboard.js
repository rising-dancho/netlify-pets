const cookie = require('cookie');

const handler = async (event) => {
  // console.log(event.headers.cookie);

  const incomingCookie = cookie.parse(event.headers.cookie || '');
  if (
    incomingCookie?.petadoption == 'asdasdasdasdEADFACDASDASdasd!13224324sd'
  ) {
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
