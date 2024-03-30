import { requests } from "./RequestTemplate";

export const adminApi = {
  getTopics,
}

async function getTopics(token, queryString) {
  const data = await requests.getRequest(token, `/admin/topic/?query=${queryString}`);
  return data;
}