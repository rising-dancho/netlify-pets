const logout_btn = document.querySelector('#logout');

logout_btn.addEventListener('click', async function () {
  // this promise will delete the authorization cookie
  const ourPromise = await fetch('/.netlify/functions/logout');

  window.location = '/';
});
