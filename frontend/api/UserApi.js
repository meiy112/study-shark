import { requests } from "./RequestTemplate";

export const userApi = {
  getUser,
  updateEmail,
  updateSchool,
}

async function getUser(token) {
  const data = await requests.getRequest(token, `/user`);
  return data;
}

async function updateEmail(token, email) {
  const data = await requests.putRequest(
    token,
    `/user/email`,
    {"email": email});
  return data;
}

async function updateSchool(token, school) {
  const data = await requests.putRequest(
    token,
    `/user/school`,
    {"school": school});
  return data;
}






// IGNORE THIS:
// async function getUsers() {
//   // use ifconfig to find your local ip addr
//   const response = await axios.get("http://192.168.86.21:3000/achievement-level");
//   console.log(response.data);
// }

