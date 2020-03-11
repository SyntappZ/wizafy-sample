import queryString from "query-string";


export const fetchData = (url, method) => {
  const parsed = queryString.parse(window.location.search);
  
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: method,
      headers: {
        Authorization: "Bearer " +  parsed.access_token
      }
    }).then(response => response.json())
    .then(data => {
      resolve(data)
    }).catch(err => reject(err))
   
   
  })
}