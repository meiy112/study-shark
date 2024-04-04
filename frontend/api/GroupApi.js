import { requests } from "./RequestTemplate";

export const groupApi = {
  getGroups,
};

// gets the title, number of materials, and joincode in all groups
async function getGroups(token) {
  const data = await requests.getRequest(token, "/group");
  return data;
}
