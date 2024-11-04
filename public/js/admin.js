async function start() {
  const ourPromise = await fetch('/.netlify/functions/adminDashboard');
  const ourData = await ourPromise.json();
  console.log('handler invoked!');

  if (ourData.success) {
    // doing something interesting, show the pet management UI
    console.log(ourData);
    const pets_container = document.querySelector('#render-pets');
    const pets_card = document.querySelector('#render-pets.pet-card');
    pets_card.style.cssText = `display: grid !important;
  grid-template-columns: 165px 1fr;
  border-radius: var(--br-card);
  overflow: hidden;
  background-color: var(--light-background);
  border: 1px solid var(--gray-border);
  box-shadow: var(--box-shadow);`;

    // adding the pet cards inside the pets container
    pets_container.innerHTML = ourData.pets;
  } else {
    window.location = '/login';
  }
}

start();
