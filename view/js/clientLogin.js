const loginButton = document.querySelector('#loginButton');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#password');

function saveToken(token) {
  sessionStorage.setItem('auth', token);
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



async function loggedin() {
  const token = getToken();
  const url = 'http://localhost:3000/api/auth/loggedin';

  const response = await fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': 'Bearer' + token
      }
  });
  const data = await response.json();
  return await data;
}


loginButton.addEventListener('click', async () => {
  const username = inputUser.value;
  const password = inputPass.value;    

  let loggedin = await login(username, password);
  console.log('loggedin', loggedin);
  if (loggedin.success && loggedin.role === 'admin') {
    saveToken(loggedin.token);
      location.href = 'http://localhost:3000/admin.html';
  }
  else {
      location.href = 'http://localhost:3000/verify.html';
  }
});

//loggedin();