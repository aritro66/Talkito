import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4001/api" });

export const fetchUsers = (email) => API.get(`/users?email=${email}`);
export const createUser = (newUser) => API.post("/users/create", newUser);
export const fetchMessages = (from, to) =>
  API.get(`/messages?from=${from}&to=${to}`);
export const sendMessage = (newMessage) =>
  API.post("/messages/create", newMessage);
