import { BASE_URL } from "../constants/Config";

export const requests = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
}

// performs a get request to the given url with the given jwt token. Throws an error on faliure
async function getRequest(token, url) {
  // req headers
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  let response;
  let data;

  // try to call backend
  try {
    response = await fetch(BASE_URL + url, {
      method: 'GET',
      headers: headers,
    });
    data = await response.json();
  } catch (e) {
    throw new Error(e + " for GET " + url)
  }
  
  // if nothing went wrong, return data
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.message + ": " + data.detail + " at GET " + url);
  }
}

// performs a post request to the given url with the given jwt token. Throws an error on faliure
async function postRequest(token, url) {
  // TODO
}

// performs a put request to the given url with the given jwt token. Throws an error on faliure
async function putRequest(token, url) {
  // TODO
}

// performs a delete request to the given url with the given jwt token. Throws an error on faliure
async function deleteRequest(token, url) {
  // req headers
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  let response;

  // try to call backend
  try {
    response = await fetch(BASE_URL + url, {
      method: 'DELETE',
      headers: headers,
    });
  } catch (e) {
    throw new Error(e + " for DELETE " + url)
  }
  
  // if nothing went wrong, return
  if (response.ok) {
    return;
  } else {
    throw new Error(data.message + ": " + data.detail + " at DELETE " + url);
  }
}

