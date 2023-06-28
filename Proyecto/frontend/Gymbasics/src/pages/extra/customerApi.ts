import { analytics } from "ionicons/icons";
import Customer from "./Customer";

export async function searchCustomers() {

    // eslint-disable-next-line prefer-const
    let url = process.env.REACT_APP_API + 'customers';
    // eslint-disable-next-line prefer-const
    let response = await fetch(url, {
        "method": 'GET',
        "headers": {
            "Content-Type": 'application/json',
        }
    })
    return await response.json();

}
//estaria bien mirar que significa el async y el await
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