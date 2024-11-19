const getDbClient = require('../../our-library/getDbClient');
const { ObjectId } = require('mongodb');
const isAdmin = require('../../our-library/isAdmin');

// const cookie = require('cookie');

const handler = async (event) => {
  // console.log(event.headers.cookie);

  if (isAdmin(event)) {
    // making a connection to the mongodb database
    const client = await getDbClient();

    const body = JSON.parse(event.body);
    // getting the pets data from the db
    const pet = await client
      .db()
      .collection('pets')
      .findOne({ _id: new ObjectId(body.id) });
    client.close();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true, pet: pet }),
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
