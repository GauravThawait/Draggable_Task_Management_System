export const store_token = (token) => {
  if (token) {
    localStorage.setItem("token", token); 
    console.log("Token stored in localStorage , ", token);
  } else {
    console.error("No token provided");
  }
};

export const get_token = () => {
    return localStorage.getItem("token");
  
};

export const remove_token = () => {
  localStorage.removeItem("token");
}
