import EditRoutine from "../interfaces/UpdatedRoutine";
import FullRoutine from "../interfaces/FullRoutine";
import UpdatedRoutine from "../interfaces/UpdatedRoutine";

export async function getExercisesByRoutine(routineId: string | null) {
  if (routineId === null) {
    console.error('id is missing');
    return null;
  }

  const apiUrl = process.env.REACT_APP_API;
  if (!apiUrl) {
    console.error('API URL is missing');
    return null;
  }

  const url = `${apiUrl}${routineId}/exercises`;
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

export async function saveRoutine(fullRoutine: FullRoutine | undefined): Promise<Response> {

  const apiUrl = process.env.REACT_APP_API;

  const url = `${apiUrl}createroutine`;
  const token = localStorage.getItem('token');

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(fullRoutine),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    mode: 'cors',
  });

  return response;
}

export async function deleteRoutine(routineId: string | null) {
  if (routineId === null) {
    console.error('id is missing');
    return null;
  }

  const apiUrl = process.env.REACT_APP_API;
  if (!apiUrl) {
    console.error('API URL is missing');
    return null;
  }

  const url = `${apiUrl}routines/${routineId}`;
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token not found');
    return null;
  }

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  ;
}

export async function getRoutinesById(routineId: string | null) {
  if (routineId === null) {
    console.error('id is missing');
    return null;
  }

  const apiUrl = process.env.REACT_APP_API;
  if (!apiUrl) {
    console.error('API URL is missing');
    return null;
  }

  const url = `${apiUrl}routines/${routineId}`;
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

export async function updateRoutine(editRoutine: UpdatedRoutine | null, routineId: string | null) {
  if (editRoutine === null) {
    console.error('routine is missing');
    return null;
  }

  const apiUrl = process.env.REACT_APP_API;
  if (!apiUrl) {
    console.error('API URL is missing');
    return null;
  }

  const url = `${apiUrl}editroutine/${routineId}`;
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token not found');
    return null;
  }

  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(editRoutine),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return await response.json();
}