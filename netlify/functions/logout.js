const cookie = require('cookie');

const handler = async (event) => {
  // replacing the authorization cookie with just a dash (-) so it wont authorize
  const myCookie = cookie.serialize(
    'petadoption',
    '-',
    {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 0,
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
};
module.exports = { handler };
