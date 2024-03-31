import { requests } from "./RequestTemplate";

export const topicApi = {
  getHomePageTopics,
  getGeneralInfo,
  getTags,
  getFilteredSortedStudymaterial,
  deleteStudyMaterial,
  getFeaturedTopics,
  getFeaturedStudyMaterial,
  getSettingsTopic,
  updateTopic,
  deleteTopic,
}

async function getHomePageTopics(token, filterList, sortBy, searchQuery) {
  const data = await requests.postRequest(
    token,
     `/topic/home-page/?sort=${sortBy}&searchQuery=${searchQuery}`,
     {"filterList": filterList});
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

async function getFeaturedTopics(token, subject) {
  const data = await requests.getRequest(token, `/topic/featured/?subject=${subject}`);
  return data;
}

async function getFeaturedStudyMaterial(token, subject) {
  const data = await requests.getRequest(token, `/topic/studymaterial/featured/?subject=${subject}`);
  return data;
}

async function deleteStudyMaterial(token, topicId, title) {
  await requests.deleteRequest(token, `/topic/${topicId}/studymaterial/${title}`);
}

async function getSettingsTopic(token, id) {
  const data = await requests.getRequest(token, `/topic/:${id}/settings`);
  return data;
}

async function updateTopic(token, id, topic) {
  await requests.putRequest(
    token,
    `/topic/:${id}`,
    topic
    );
}

async function deleteTopic(token, id) {
  await requests.deleteRequest(token, `/topic/:${id}`);
}