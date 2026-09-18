import api from "./api";

export const getPersonalizedNews = () => api.get("/news/personalized");
export const getNewsById = (id) => api.get(`/news/${id}`);
export const recordPlay = (id, payload = {}) => api.post(`/news/${id}/play`, payload);
