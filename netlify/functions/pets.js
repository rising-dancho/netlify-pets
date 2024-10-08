const { MongoClient } = require('mongodb');

const handler = async () => {
  const client = new MongoClient(process.env.CONNECTION_STRING);
  await client.connect();

  const pets = await client.db().collection('pets').find().toArray();
  client.close();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', //Allow any external website to Acess the API Route
    },
    body: JSON.stringify(pets),
  };
};

module.exports = { handler };
