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
  // alert(pet);
  console.log(pet);
  if (!pet.name) {
    window.location = '/admin';
  }


  pet.name

  // populating the input field values with the values from the db
  document.querySelector('#name').value = pet.name;
  document.querySelector('#birthYear').value = pet.birthYear;
  document.querySelector('#species').value = pet.species;
  document.querySelector('#description').value = pet.description;
}

getEditPet();

// FIX: If and when select tag is not populating properly, do this:
// The issue with setting the value of a <select> element is often due to one of these reasons:

// Value mismatch: The pet.species value you're trying to set doesn't match any of the value attributes of the <option> elements in the <select>. If <option> elements don't explicitly define a value attribute, their text content will be used as their value by default.

// Incorrect timing: The document.querySelector('#species').value = pet.species; statement might be executed before the <select> element or its options are fully available in the DOM.
