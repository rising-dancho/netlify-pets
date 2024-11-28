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
      .findOne({ _id: ObjectId.createFromHexString(body.id) });
    client.close();

    if (!pet) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ success: false, message: 'Pet not found' }),
      };
    }

    // Escape the fields to avoid injection risks
    const sanitizedPet = {
      name: escape(pet.name || ''),
      birthYear: escape(pet.birthYear || ''),
      species: escape(pet.species || ''),
      description: escape(pet.description || ''),
      photo: escape(pet.photo || ''),
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanitizedPet),
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
