document.querySelector('#login-form').addEventListener('submit', handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();

  const ourPromise = await fetch('/.netlify/functions/loginAttempt', {
    method: 'POST',
    headers: {},
    body: JSON.stringify({ username: 'x', password: 'x' }),
  });
}
