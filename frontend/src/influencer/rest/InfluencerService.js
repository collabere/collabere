import axios from "axios";

export function getInfluecerDetailsPromise(authorization, influencerUsername) {
  const params = {
    username: influencerUsername
  };

  const config = {
    headers: {
      Authorization: `Token ${authorization}`
    },
    params: params
  };

  return axios.get("/influencer/user_details", config);
}
