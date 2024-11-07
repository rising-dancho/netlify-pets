const cookie = require('cookie');

function isAdmin(event) {
  const incomingCookie = cookie.parse(event.headers.cookie || '');
  if (
    incomingCookie?.petadoption == 'asdasdasdasdEADFACDASDASdasd!13224324sd'
  ) {
    return true;
  }

  return false;
}

module.exports = isAdmin;
