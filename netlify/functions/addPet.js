const sanitizeHTML = require('sanitize-html');
const getDbClient = require('../../our-library/getDbClient');
const isAdmin = require('../../our-library/isAdmin');

function cleanUp(x) {
  return sanitizeHTML(x, {
    allowTags: [],
    allowedAttributes: {},
  });
}

const handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log(body);

  let pet = {
    name: cleanUp(body.name),
    species: cleanUp(body.species),
    description: cleanUp(body.description),
    birthYear: new Date().getFullYear(),
  }; // add current year user didn't type in a birth year

  // checking for the birthYear's validity
  if (body.birthYear > 999 && body.birthYear < 9999) {
    pet.birthYear = body.birthYear;
  }

  if (pet.species !== 'Cat' && pet.species !== 'Dog') {
    pet.species = 'Dog';
  }

  // isAdmin is a separate reusable function
  if (isAdmin(event)) {
    // making a connection to the mongodb database
    const client = await getDbClient();
    // actually save into database
    const pets = await client.db().collection('pets').insertOne(pet);
    // client.close();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true }),
    };
  }

  // no permission

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };
