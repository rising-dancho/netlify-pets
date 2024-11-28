const urlVariables = new URLSearchParams(window.location.search);
const id = urlVariables.get('id');
// alert(id);

async function getEditPet() {
  const ourPromise = await fetch('/.netlify/functions/getSingularPet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id }),
  });

  const pet = await ourPromise.json();
  console.log(pet);
  console.log('pet triggered!');
  if (!pet.name) {
    window.location = '/admin';
  }

  // populating the input field values with the values from the db
  document.querySelector('#name').value = pet.name;
  document.querySelector('#birthYear').value = pet.birthYear;
  document.querySelector('#species').value = pet.species;
  document.querySelector('#description').value = pet.description;

  if (pet.photo) {
    console.log('pet.photo triggered!');
    document.querySelector(
      '#photo-preview'
    ).innerHTML = `<img src="https://res.cloudinary.com/dggewe2of/image/upload/w_190,h_190,c_fill/${pet.photo}.jpg"/>`;
  }

  // remove loading animation
  document.querySelector('#edit-pet-form').classList.remove('form-is-loading');
  document.querySelector('#name').focus;
}

getEditPet();

document
  .querySelector('#edit-pet-form')
  .addEventListener('submit', async function (e) {
    e.preventDefault();

    const pet = {
      id: id,
      name: document.querySelector('#name').value,
      birthYear: document.querySelector('#birthYear').value,
      species: document.querySelector('#species').value,
      description: document.querySelector('#description').value,
    };

    // add loading animation
    document.querySelector('#edit-pet-form').classList.add('form-is-loading');

    const ourPromise = await fetch('/.netlify/functions/saveChanges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pet),
    });

    const theResponse = await ourPromise.json();

    if (theResponse.success) {
      window.location = '/admin';
    }
  });
