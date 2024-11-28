const getDbClient = require('../../our-library/getDbClient');
const isAdmin = require('../../our-library/isAdmin');
const escape = require('escape-html');
const cloudname = 'dggewe2of';

const handler = async (event) => {
  // console.log(event.headers.cookie);

  if (isAdmin(event)) {
    // making a connection to the mongodb database
    const client = await getDbClient();

    // getting the pets data from the db
    const pets = await client.db().collection('pets').find().toArray();
    client.close();

    const petsHTML = generateHTML(pets);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true, pets: petsHTML }),
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

function generateHTML(pets) {
  let ourHTML = `<div class="list-of-pets">`;

  ourHTML += pets
    .map((pet) => {
      if (!pet.photo) {
        pet.photo = '/images/fallback.jpg';
      } else {
        pet.photo = `https://res.cloudinary.com/${cloudname}/image/upload/w_330,h_392,c_fill/${pet.photo}.jpg`;
      }

      return `<div class="pet-card">
          <div class="pet-details-container">
            <h3>${escape(pet.name)}</h3>
            <p class="pet-description">${escape(pet.description)}</p>
            <div class="action-buttons-container">
              <a  class="action-btn" href="/admin/edit-pet?id=${
                pet._id
              }">Edit</a>
              <button onClick="handleDelete('${
                pet._id
              }', this)" class="action-btn">Delete</button>
            </div>
          </div>
          <div class="pet-card-photo">
            <img src="${escape(pet.photo)}" alt="a ${escape(
        pet.species
      )} named ${escape(pet.name)}">
          </div>
        </div>`;
    })
    .join('');
  ourHTML += `</div>`;

  return ourHTML;
}

module.exports = { handler };
