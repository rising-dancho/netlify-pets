async function start() {
  const cookiesPromise = await fetch('/.netlify/functions/adminDashboard');
  const cookieData = await cookiesPromise.json();
  console.log("handler invoked!")

  if (cookieData.success) {
    // doing something interesting, show the pet management UI
  } else {
    window.location = '/login';
  }
}

start();
