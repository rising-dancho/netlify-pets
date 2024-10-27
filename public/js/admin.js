async function start() {
  const cookiesPromise = await fetch('/netlify/functions/adminDashboard');
  const cookieData = await cookiesPromise.json();
  console.log(cookieData);
}

start();
