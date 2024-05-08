export function isAuthenticaded() {
    return localStorage.getItem("token") ? true : false;
  }

  export const token = localStorage.getItem("token");

  export const user = localStorage.getItem("name");
  export const avatar = localStorage.getItem("avatar");
  export const isManager = localStorage.getItem('isManager') 
  ? JSON.parse(localStorage.getItem('isManager') as string) 
  : null;

  
  