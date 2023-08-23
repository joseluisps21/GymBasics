
export async function getMuscles() {
    const url = process.env.REACT_APP_API + 'muscles';
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
