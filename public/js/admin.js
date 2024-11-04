async function start() {
  const cookiesPromise = await fetch('/.netlify/functions/adminDashboard');
  const cookieData = await cookiesPromise.json();
  console.log('handler invoked!');

  if (cookieData.success) {
    // doing something interesting, show the pet management UI
    console.log(cookieData);
    const pets_container = document.querySelector('#render-pets');

    // adding the pet cards inside the pets container
    pets_container.innerHTML = ourData.pets;
  } else {
    window.location = '/login';
  }
}

start();
