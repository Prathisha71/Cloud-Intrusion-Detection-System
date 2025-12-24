import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export const manualProcessLog = async (features) => {
  const res = await axios.post(`${BASE_URL}/manualProcessLog`, { features });
  return res.data;
};

export const batchProcessLogs = async (features_list) => {
  const res = await axios.post(`${BASE_URL}/batchProcessLogs`, { features_list });
  return res.data;
};
