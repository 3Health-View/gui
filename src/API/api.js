import axios from "axios";

export const signup = async (payload) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/users/signup`,
    payload
  );
  return data;
};

export const login = async (payload) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/users/login`,
    payload
  );
  return data;
};

export const updateOuraTokens = async ({ accessToken, refreshToken }) => {
  const { data } = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/users/update-oura`,
    {
      ouraToken: accessToken,
      ouraRefresh: refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
    }
  );

  return data;
};

export const getToken = async (payload) => {
  const {
    data: { access_token, refresh_token },
  } = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/users/get-token`,
    payload
  );

  const data = await updateOuraTokens({
    accessToken: access_token,
    refreshToken: refresh_token,
  });

  return data;
};

export const refreshToken = async (payload) => {
  const refreshed = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/users/refresh-token`,
    payload
  );

  const data = await updateOuraTokens({
    accessToken: refreshed.data.access_token,
    refreshToken: refreshed.data.refresh_token,
  });

  return data;
};

export const getDisplayInfo = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/data/display-info`,
    {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem("token")}`,
      },
    }
  );

  return data;
};
