function fetchToken(clientID, clientSecret, code) {
  const redirect_uri = "http://localhost:3000/dashboard";
  const authOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${clientID}:${clientSecret}`),
    },
    body: new URLSearchParams({
      code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    }),
  };

  return fetch('https://accounts.spotify.com/api/token', authOptions)
  .then((res) => {
    if (!res.ok) {
      console.error("Failed to fetch");
    } else {
      return res.json();
    }
  })
  .then((data) => {
    return data;
  })
  .catch((err) => console.error(err));
}

function getProfile(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch("https://api.spotify.com/v1/me", requestOptions)
    .then((res) => {
      if (!res.ok) {
        console.error("Failed to fetch");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));
}

export { fetchToken, getProfile };
