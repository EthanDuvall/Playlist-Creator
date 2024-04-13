function fetchToken(clientID, clientSecret, code) {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/dashboard");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + btoa(`${clientID}:${clientSecret}`),
    },
    body: params.toString(),
  };

  return fetch("https://accounts.spotify.com/api/token", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.access_token) {
        return data.access_token;
      } else {
        throw new Error("Failed to fetch access token");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
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
        throw new Error("Failed to fetch");
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
