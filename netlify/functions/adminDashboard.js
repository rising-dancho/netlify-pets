const getDbClient = require('../../our-library/getDbClient');
const isAdmin = require('../../our-library/isAdmin');

// const cookie = require('cookie');

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
      return `<div class="pet-card">
          <div class="pet-details-container">
            <h3>${pet.name}</h3>
            <p class="pet-description">${pet.description}</p>
            <div class="action-buttons-container">
              <a  class="action-btn" href="/admin/edit-pet?id=${pet._id}">Edit</a>
              <button class="action-btn">Delete</button>
            </div>
          </div>
          <div class="pet-card-photo">
            <img src="../images/fallback.jpg" alt="a ${pet.species} named ${pet.name}">
          </div>
        </div>`;
    })
    .join('');
  ourHTML += `</div>`;

  return ourHTML;
}

module.exports = { handler };
