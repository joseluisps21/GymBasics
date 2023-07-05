import User from "../interfaces/User"

export async function registerUser(user: User) {
  const url = process.env.REACT_APP_API + 'users/register';
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function loginUser(username: string, password: string) {
  const url = process.env.REACT_APP_API + 'users/login';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

export async function getUserById(id: string) {
  const url = process.env.REACT_APP_API + 'users/' + id;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

// Otras funciones de la API de usuarios...

