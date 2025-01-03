import { apiInstance } from "./apiInstence";


/**
 * Login API endpoint
 * @param {object} data - Account Credentials
 * @param {string} data.email - Email used by the account
 * @param {string} data.password - Password
 * 
 */
export const loginUser = async (data) => {
 

  try {
    const response = await apiInstance.post("/user/login", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};


/**
 * Signup API endpoint
 * @param {object} data - Credentials to create account
 * @param {string} data.username - username
 * @param {string} data.email - Email
 * @param {string} data.password - Password
 */
export const signupUser = async (data) => {
    try {
      const response = await apiInstance.post("/user/register", data);
      console.log(response);
      return response.data;  
    } catch (error) {
      console.error(error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  };


/**
 * refreshAccessToken API endpoint
 * Refreshes the access token by sending a request to the /reauth endpoint.
 * 
 * @returns {Promise<object>} - The response containing the new access token.
 * @throws {Error} - Throws an error if the refresh request fails.
 */
export const refreshAccessToken = async () => {
    try {
      const response = await apiInstance.post("/user/reauth", {}, {
        withCredentials: true, // Ensure the cookies are sent with the request
      });
      return response.data;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error.response ? error.response.data : new Error(error.message);
    }
  };
  

/**
 * Logout API endpoint
 * @returns {Promise} - No response body
 */
export const logout = async () => {
  try {
    const response = await apiInstance.post("/user/logout", { 
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error.response ? error.response.data : new Error(error.message); 
  }
};

/**
 * logoutEveryDevice API endpoint
 * @returns {Promise} - No response body
 */
export const logoutEveryDevice = async () => {
  try {
    const response = await apiInstance.post("/user/master-logout", { 
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error.response ? error.response.data : new Error(error.message); 
  }
};




/**
 * Create new Book
 * @returns {Promise} -  response body
 */
export const addBook = async (data) => {
  try {
    const response = await apiInstance.post("/book/upload", { 
      withCredentials: true,
      data: data
    }, );
    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error.response ? error.response.data : new Error(error.message); 
  }
};


/**
 * Fetch Books
 * @returns {Promise<object>} - Books Data
 */
export const getBooks = async ({ page, limit, search }) => {
  try {
    const response = await apiInstance.post(`/book/fetchBooks/${page}/${limit}`, { search });
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};


/**
 * Borrow Books
 * @returns {Promise<object>} - Borrow book by id
 */
export const borrowBook = async ({ bookId}) => {
  try {
    const response = await apiInstance.post(`/book/borrow/${bookId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error.response ? error.response.data : new Error(error.message);
  }
};


