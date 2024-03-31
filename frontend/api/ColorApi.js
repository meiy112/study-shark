import { requests } from "./RequestTemplate";

export const colorApi = {
  getColors,
}

async function getColors(token) {
  const data = await requests.getRequest(token, `/color`);
  return data;
}
