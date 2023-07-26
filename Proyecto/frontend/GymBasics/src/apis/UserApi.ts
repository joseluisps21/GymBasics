import User from "../interfaces/User"

import { useState } from 'react';
import { IonToast, IonButton } from '@ionic/react';

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




export async function getUserById(id: string) {
  const url = process.env.REACT_APP_API + 'users/' + id;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });
  return await response.json();
}



