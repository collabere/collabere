import axios from "axios";

export function returnMarkProjectCompletedPromise(
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

  return axios.get("/project/change_project_completion_status", config);
}
