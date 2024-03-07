import axios from 'axios';

import {BASE_URL} from '../Configuration';

export const UserApi = {
  getUsers
}


async function getUsers() {
  const response = await axios.get("http://localhost:3000/messages/");
  console.log(response.data);
}

