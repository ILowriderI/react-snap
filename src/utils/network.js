import axios from "axios";

export const getRequest = async (url) => {
  return await axios.get(url);
};

export const postRequest = async (url, item) => {
  return await axios.post(url, item);
};

export const getRequestWithToken = async (url, token) => {
  return await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const postRequestWithToken = async (url, item, token) => {
  return await axios.post(url, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
