import axios from 'axios';

import {BASE_URL} from '../Configuration';

export const UserApi = {
  getUsers
}

// ignore this, doesnt work rn cuz i changed backend

async function getUsers() {
  // use ifconfig to find your local ip addr
  const response = await axios.get("http://192.168.86.21:3000/achievement-level");
  console.log(response.data);
}

