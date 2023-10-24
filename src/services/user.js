import {USER_API_ENDPOINT} from '../constants/index'
export const getUserData = (page) => {
  return fetch(`${USER_API_ENDPOINT}?page=${page}`).then((res) =>
    res.json()
  );
};

export const deleteUser = (userId) => {
  return fetch(`${USER_API_ENDPOINT}/${userId}`, {
    method: "DELETE",
  }).then((res) => res.status === 204);
};

export const addUser = (userData) => {
  const reqObj = {
    method: "POST",
    body: JSON.stringify(userData),
  };
  return fetch(USER_API_ENDPOINT, reqObj).then((res) => res.json());
};
