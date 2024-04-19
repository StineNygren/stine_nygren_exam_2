export function isAuthenticaded() {
    return localStorage.getItem("jwt") ? true : false;
  }

  export const token = localStorage.getItem("token");

  export const user = localStorage.getItem("name");
  