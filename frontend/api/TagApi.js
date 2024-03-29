import { requests } from "./RequestTemplate";

export const tagApi = {
  getTags,
}

// gets all the tags of all the topics belonging to the current user
async function getTags(token) {
  const data = await requests.getRequest(token, '/tag');
  return data;
}