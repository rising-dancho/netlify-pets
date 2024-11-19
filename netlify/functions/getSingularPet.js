const escape = require('escape-html');
const getDbClient = require('../../our-library/getDbClient');
const { ObjectId } = require('mongodb');
const isAdmin = require('../../our-library/isAdmin');

// const cookie = require('cookie');

const handler = async (event) => {
  // console.log(event.headers.cookie);

  if (isAdmin(event)) {
    const body = JSON.parse(event.body);

    // just returns an empty string if provided with invalid/bogus id from the params
    if (!ObjectId.isValid(body.id)) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      };
    }

    // making a connection to the mongodb database
    const client = await getDbClient();

    // getting the pets data from the db
    const pet = await client
      .db()
      .collection('pets')
      .findOne({ _id: new ObjectId(body.id) });
    client.close();

    // sanitizing data before sending it to the database
    pet.name = escape(pet.name);
    pet.birthYear = escape(pet.birthYear);
    pet.species = escape(species);
    pet.description = escape(pet.description);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pet),
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
