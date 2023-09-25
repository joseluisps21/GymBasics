import FullWorkout from "../interfaces/FullWorkout";
import Workout from "../interfaces/Workout";

export async function saveWorkout(workout : Workout | undefined): Promise<Response> {

    const apiUrl = process.env.REACT_APP_API;
  
    const url = `${apiUrl}workouts`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      mode: 'cors',
    });
  
    return response;
  }

  export async function saveFullWorkout(fullworkout : FullWorkout | undefined): Promise<Response> {

    const apiUrl = process.env.REACT_APP_API;
  
    const url = `${apiUrl}createworkout`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(fullworkout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      mode: 'cors',
    });
  
    return response;
  }

  export async function getWorkoutById(workoutId: string | null) {
    if (workoutId === null) {
      console.error('id is missing');
      return null;
    }
  
    const apiUrl = process.env.REACT_APP_API;
    if (!apiUrl) {
      console.error('API URL is missing');
      return null;
    }
  
    const url = `${apiUrl}workouts/${workoutId}`;
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

  export async function getWorkoutsByUsernameAndExerciseId(username: string | null , exerciseId: string | null) {
    if (exerciseId === null) {
      console.error('id is missing');
      return null;
    }
  
    const apiUrl = process.env.REACT_APP_API;
    if (!apiUrl) {
      console.error('API URL is missing');
      return null;
    }
  
    const url = `${apiUrl}getspecificworkout/${username}/${exerciseId}`;
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

  export async function getWorkoutCountByUsername(username: string | null) {
    if (username === null) {
      console.error('username is missing');
      return null;
    }
  
    const apiUrl = process.env.REACT_APP_API;
    if (!apiUrl) {
      console.error('API URL is missing');
      return null;
    }
  
    const url = `${apiUrl}workoutscount/${username}`;
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

  export async function deleteWorkout( workoutId: string | null) {
    if (workoutId === null) {
      console.error('id is missing');
      return null;
    }
  
    const apiUrl = process.env.REACT_APP_API;
    if (!apiUrl) {
      console.error('API URL is missing');
      return null;
    }
  
    const url = `${apiUrl}workouts/${workoutId}`;
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
  
    return response;
  }