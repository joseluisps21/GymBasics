import User from "../interfaces/User"

import { useState } from 'react';
import { IonToast, IonButton } from '@ionic/react';
import UserLevel from "../interfaces/UserLevel";
import UserFocus from "../interfaces/UserFocus";

//Función de registro de usuario
export async function saveUser(user: User): Promise<Response> {
  const url = process.env.REACT_APP_API + 'register';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });
  console.log(response.headers.get('Content-Length'));

  return response;
}


export async function loginUser(username: string, password: string): Promise<Response> {
  const url = process.env.REACT_APP_API + 'login';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });
  return response
}

export async function getUserByUsername(username: string | null) {
  const url = process.env.REACT_APP_API + 'users/' + username;
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.error('Token no encontrado');
    return null;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, //JWT tokken en solicitud que requiere autenticacion
    },
  });

  return await response.json();
}

export async function getRoutinesByUsername(username: string | null) {
  if (username === null) {
    console.error('Username is missing');
    return null;
  }

  const apiUrl = process.env.REACT_APP_API;
  if (!apiUrl) {
    console.error('API URL is missing');
    return null;
  }

  const url = `${apiUrl}${username}/routines`;
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token not found');
    return null;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return await response.json();
}

export async function editLevel(userLevel:  UserLevel | null) {
  if (userLevel === null) {
    console.error('Username is missing');
    return null;
  }

  const apiUrl = process.env.REACT_APP_API;
  if (!apiUrl) {
    console.error('API URL is missing');
    return null;
  }

  const url = `${apiUrl}editlevel`;
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token not found');
    return null;
  }

  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(userLevel),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return await response.json();
}

export async function editFocus(userFocus:  UserFocus | null) {
  if (userFocus === null) {
    console.error('Username is missing');
    return null;
  }

  const apiUrl = process.env.REACT_APP_API;
  if (!apiUrl) {
    console.error('API URL is missing');
    return null;
  }

  const url = `${apiUrl}editfocus`;
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token not found');
    return null;
  }

  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(userFocus),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return await response.json();
}




