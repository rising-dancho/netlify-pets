const getDbClient = require('../../our-library/getDbClient');
const { ObjectId } = require('mongodb');
const isAdmin = require('../../our-library/isAdmin');

// const cookie = require('cookie');

const handler = async (event) => {
  // console.log(event.headers.cookie);

  if (isAdmin(event)) {
    const body = JSON.parse(event.body);
    // console.log(body);

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
      .deleteOne({ _id: ObjectId.createFromHexString(body.id) });
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

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true, message: 'Pet deleted!' }),
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
