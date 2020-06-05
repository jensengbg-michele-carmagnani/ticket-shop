

const loginButton = document.querySelector('#loginButton');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#password');
const errorMessage = document.querySelector('#errormessage')

function saveToken(token) {
  return sessionStorage.setItem('auth', token);
}

function getToken() {
  return sessionStorage.getItem('auth');
}


async function login(username, password) {
  const url = 'http://localhost:3000/api/auth/login';

  const account = {
      username: username,
      password: password
  }

  const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(account),
      headers: {
          'Content-Type': 'application/json'
      }
  });

  const data = await response.json();
  return await data;
}



loginButton.addEventListener('click', async () => {
  const username = inputUser.value;
  const password = inputPass.value;    

  let loggedin = await login(username, password);

  if (loggedin.success && loggedin.role === 'admin') {
    saveToken(loggedin.token);
      location.href = 'http://localhost:3000/admin.html';
  }
  else if (loggedin.success && loggedin.role === 'user') {
    saveToken(loggedin.token);
      location.href = 'http://localhost:3000/verify.html';
  }else {
      errorMessage.classList.toggle('hide')
      errorMessage.innerHTML = `${loggedin.message}`;
  }
});

//loggedin  ();