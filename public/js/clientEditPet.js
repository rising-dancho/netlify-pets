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
}

getEditPet();
