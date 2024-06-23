//useApi.js

import { getData, putData } from "./ApiCall";

export const getUsersData = async () => {
  return await getData("/hearhere_users");
};

export const fetchEventCategories = async () => {
  return await getData("/hearhere_eventcategories");
};

export const fetchEvents = async () => {
  return await getData("/hearhere_events");
};

export const updateEventCategories = async (updatedUserDetails) => {
  return await putData("/hearhere_users", updatedUserDetails);
};

export const addToFavorites = async (updatedUserDetails) => {
  return await putData("/hearhere_users", updatedUserDetails);
};

export const removeFromFavourites = async (updatedUserDetails) => {
  return await putData("/hearhere_users", updatedUserDetails);
};

export const bookEventTickets = async (updatedevent) => {
  return await putData("/hearhere_events", updatedevent);
};

export const updateBookHistory = async (updatedUserDetails) => {
  return await putData("/hearhere_users", updatedUserDetails)
}