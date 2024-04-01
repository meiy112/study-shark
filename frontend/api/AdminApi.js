import { requests } from "./RequestTemplate";

export const adminApi = {
  getTopics,
  getTables,
}

async function getTopics(token, queryString) {
  const encodedQuery = encodeURIComponent(queryString);
  const data = await requests.getRequest(token, `/admin/topic/?query=${encodedQuery}`);
  return data;
}

async function getTables(token, tableName, attrs) {
  const data = await requests.postRequest(
    token, 
    `/admin/table/?name=${tableName}`,
    {"attrList": attrs});
  return data;
}