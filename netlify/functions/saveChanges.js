const { ObjectId } = require('mongodb');
const sanitizeHtml = require('sanitize-html');
const getDbClient = require('../../our-library/getDbClient');
const isAdmin = require('../../our-library/isAdmin');

const cloudinaryConfig = cloudinary.config({
  cloud_name: 'dggewe2of',
  api_key: '769445293545881',
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

function cleanUp(x) {
  return sanitizeHtml(x, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

const handler = async (event) => {
  const body = JSON.parse(event.body);
  console.log(body);

  // malicious entry injection prevention
  if (typeof body.name != 'string') {
    body.name = '';
  }

  if (typeof body.description != 'string') {
    body.description = '';
  }

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

  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id: body.public_id, version: body.version },
    cloudinaryConfig.api_secret
  );
  if (expectedSignature === body.signature) {
    pet.photo = body.public_id;
  }

  // isAdmin is a separate reusable function
  if (isAdmin(event)) {
    // dont come through if the id is NOT valid
    if (!ObjectId.isValid(body.id)) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ success: false }),
      };
    }

    // making a connection to the mongodb database
    const client = await getDbClient();
    // actually save into database
    await client
      .db()
      .collection('pets')
      .findOneAndUpdate({ _id: new ObjectId(body.id) }, { $set: pet });
    client.close();

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
