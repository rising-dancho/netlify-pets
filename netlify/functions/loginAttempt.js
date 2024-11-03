const cookie = require('cookie');

const handler = async (event) => {
  // console.log(event.headers.cookie);

  const body = JSON.parse(event.body || '');
  if (body.username === 'learn' && body.password === 'javascript') {
    const myCookie = cookie.serialize(
      'petadoption',
      'asdasdasdasdEADFACDASDASdasd!13224324sd',
      {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
      } // maxAge: 1 min, 1 hour, 1 day
    ); // arguments: label, value, configuration object {}
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': myCookie,
        Location: '/',
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
