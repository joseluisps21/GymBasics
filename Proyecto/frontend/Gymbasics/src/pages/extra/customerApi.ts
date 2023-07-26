import { analytics } from "ionicons/icons";
import Customer from "./Customer";

export async function searchCustomers() {
    const url = process.env.REACT_APP_API + 'customers';
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

export async function removeCustomer(id:string){

    const url = process.env.REACT_APP_API + 'customers/'+id;
    await fetch(url, {
        "method": 'DELETE',
        "headers": {
            "Content-Type": 'application/json',
        }
    })
}
export async function saveCustomer(customer:Customer){
    const url = process.env.REACT_APP_API + 'customers';
    await fetch(url, {
        "method": 'POST',
        "body": JSON.stringify(customer),
        "headers": {
            "Content-Type": 'application/json',
        }
    })
}

export async function searchCustomerById(id:string){
    const url = process.env.REACT_APP_API + 'customers/'+id;
    const response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json',
        }
    })
    return await response.json();
}