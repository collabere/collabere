import axios from "axios";

export function returnUpdateClientRatePromise(authorization, clientId, rating) {
  const params = {
    clientRating: rating
  };

  const config = {
    headers: {
      Authorization: `Token ${authorization}`
    },
    params: params
  };

  const requestBody = {
    clientId: clientId
  };

  return axios.post("/client/update_client_rating", requestBody, config);
}
