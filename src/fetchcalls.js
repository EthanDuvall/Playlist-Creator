function fetchToken(clientID, clientSecret) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${clientID}:${clientSecret}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  };

return fetch("https://accounts.spotify.com/api/token", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.access_token) {
        return data.access_token
      }
    })
    .catch((error) => console.error("Error:", error));
}

export { fetchToken };
