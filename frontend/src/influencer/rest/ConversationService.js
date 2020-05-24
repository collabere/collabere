import axios from "axios";

export function getAnalyseConversationPromise(
  authorization,
  projectInitiationDate
) {
  const params = {
    projectInitiationDate: projectInitiationDate
  };

  const config = {
    headers: {
      Authorization: `Token ${authorization}`
    },
    params: params
  };

  return axios.get("/messages/analyze_conversation", config);
}
