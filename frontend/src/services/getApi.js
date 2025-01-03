import { apiInstance } from "./apiInstence";

/**
 * Fetch user profile
 * @returns {Promise<object>} - User profile data
 */
export const getProfile = async () => {
  try {
    const response = await apiInstance.get("/user/profile");
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};


/**
 * Fetch user History
 * @returns {Promise<object>} - User history data
 */
export const getHistory = async () => {
  try {
    const response = await apiInstance.get("/book/history");
    return response.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};


