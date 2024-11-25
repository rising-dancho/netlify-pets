async function start() {
  const ourPromise = await fetch('/.netlify/functions/adminDashboard');
  const ourData = await ourPromise.json();
  console.log('handler invoked!');

  if (ourData.success) {
    // doing something interesting, show the pet management UI
    console.log(ourData);
    const pets_container = document.querySelector('#render-pets');

    // adding the pet cards inside the pets container
    pets_container.innerHTML = ourData.pets;
  } else {
    window.location = '/login';
  }
}

start();

async function handleDelete(id, el) {
  el.closest('.pet-card').remove();
}
