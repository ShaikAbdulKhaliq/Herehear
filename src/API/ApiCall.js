import axios from "axios";

const BASE_URL = "https://mias-backup-db-uoxb.onrender.com";
// const BASE_URL = "http://localhost:3000";
const RADIO_API_URL =
  "https://de1.api.radio-browser.info/json/stations/search?language=hindi";

const API = axios.create({
  baseURL: BASE_URL,
});

export const getData = async (url) => {
  try {
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error making GET request to ${url}:`, error);
    return [];
  }
};

export const fetchRadioStations = async () => {
  try {
    const response = await axios.post(RADIO_API_URL);
    const data = response.data.filter((station) => station.url_resolved);
    return data;
  } catch (error) {
    console.error("Error fetching radio stations:", error);
    return [];
  }
};

export const putData = async (url, data) => {
  try {
    const response = await API.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    // console.log(response.data, "response")
    return response.data;
  } catch (error) {
    console.error(`Error making PUT request to ${url}:`, error);
    return null;
  }
};
