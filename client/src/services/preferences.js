import api from "./api";

export const getPreferences = () => api.get("/preferences");
export const savePreferences = (payload) => api.put("/preferences", payload);
