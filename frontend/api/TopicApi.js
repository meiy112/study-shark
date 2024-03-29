import { requests } from "./RequestTemplate";

export const topicApi = {
  getHomePageTopics,
  getGeneralInfo,
  getTags,
  getFilteredSortedStudymaterial,
  deleteStudyMaterial,
}

async function getHomePageTopics(token) {
  const data = await requests.getRequest(token, "/topic/home-page");
  return data;
}

async function getGeneralInfo(token, topicId) {
  const data = await requests.getRequest(token, `/topic/${topicId}/general-info`);
  return data;
}

async function getTags(token, topicId) {
  const data = await requests.getRequest(token, `/topic/${topicId}/tags`);
  return data;
}

async function getFilteredSortedStudymaterial(token, topicId, type, sortBy) {
  const data = await requests.getRequest(token, `/topic/${topicId}/studymaterial/?type=${type}&sort=${sortBy}`);
  return data;
}

async function deleteStudyMaterial(token, topicId, title) {
  const response = await requests.deleteRequest(token, `/topic/${topicId}/studymaterial/${title}`);
}