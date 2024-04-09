import axios from 'axios';
const PATH_URL = 'http://localhost:3001/api';

export const getAllCategories = async () => {
  const { data } = await axios.get(`${PATH_URL}/categories`);
  return data.data;
}

export const sendNotification =  async (data) => {
  await axios.post(`${PATH_URL}/notifications`, data);
}

export const getAllNotifications = async () => {
  const { data } = await axios.get(`${PATH_URL}/notifications`);
  return data.data;
}