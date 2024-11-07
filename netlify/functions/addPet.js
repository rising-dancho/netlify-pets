const isAdmin = require('../../our-library/isAdmin');

const handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log(body);

  // isAdmin is a separate reusable function
  if (isAdmin(event)) {
    // making a connection to the mongodb database
    const client = await getDbClient();
    // actually save into database
    const pets = await client.db().collection('pets').insertOne(body);
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
