const getDbClient = require('../../our-library/getDbClient');

const handler = async () => {
  // making a connection to the mongodb database
  const client = await getDbClient();

  // getting the pets data from the db
  const pets = await client.db().collection('pets').find().toArray();
  client.close();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', //Allow any external website to Acess the Backend API Route
    },
    body: JSON.stringify(pets),
  };
};

module.exports = { handler };
