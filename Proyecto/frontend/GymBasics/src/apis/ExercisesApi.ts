import FullExercise from "../interfaces/FullExercise";

export async function getExercises() {
    const url = process.env.REACT_APP_API + 'exercises';
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

  export async function getExercisesByUsername(username: string | null) {
    if (username === null) {
      console.error('Username is missing');
      return null;
    }
  
    const apiUrl = process.env.REACT_APP_API;
    if (!apiUrl) {
      console.error('API URL is missing');
      return null;
    }
  
    const url = `${apiUrl}matching/${username}`;
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

  export async function saveExercise(fullExercise : FullExercise | undefined): Promise<Response> {

    const apiUrl = process.env.REACT_APP_API;
  
    const url = `${apiUrl}createexercise`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(fullExercise),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      mode: 'cors',
    });
  
    return response;
  }

  export async function getExerciseById(exerciseId: string | null) {
    if (exerciseId === null) {
      console.error('id is missing');
      return null;
    }
  
    const apiUrl = process.env.REACT_APP_API;
    if (!apiUrl) {
      console.error('API URL is missing');
      return null;
    }
  
    const url = `${apiUrl}exercises/${exerciseId}`;
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

  export async function getFavouritesExercisesByUsername(username: string | null) {
    if (username === null) {
      console.error('Username is missing');
      return null;
    }
  
    const apiUrl = process.env.REACT_APP_API;
    if (!apiUrl) {
      console.error('API URL is missing');
      return null;
    }
  
    const url = `${apiUrl}favorites/${username}`;
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

  