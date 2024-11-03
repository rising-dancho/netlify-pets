const username_txtbox = document.querySelector('#username');
const password_txtbox = document.querySelector('#password');
const login_form = document.querySelector('#login-form');

login_form.addEventListener('submit', handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();

  const ourPromise = await fetch('/.netlify/functions/loginAttempt', {
    method: 'POST',
    headers: {},
    body: JSON.stringify({
      username: username_txtbox.value,
      password: password_txtbox.value,
    }),
  });

  const ourData = await ourPromise.json();

  // redirect if successful login
  if (ourData.success == true) {
    window.location = '/admin';
  } else {
    alert(
      'Attention: wrong username/password. For testing: username is learn. password is javascript'
    );
  }
}

// explanation to whats happening: https://chatgpt.com/share/6727a367-a4a4-8000-ac7d-865fc92a756d
