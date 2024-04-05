import { requests } from "./RequestTemplate";

export const studyMaterialApi = {
    addStudyMaterial, 
}

async function addStudyMaterial(token, title, type, topicId) {
    await requests.postRequest(
        token,
        '/studyMaterial',
        {
        "title": title, 
        "type": type, 
        "topicId": topicId
        }
    )
}