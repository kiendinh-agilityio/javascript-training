import { BASE_API, END_POINTS, METHOD_API } from '../constants/index';

/**
 * A reusable function for making HTTP requests.
 * @param {string} url - The URL for the API endpoint.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {object} data - The data to be sent in the request body (optional).
 * @returns {Promise} A promise that resolves to the JSON response data or an error.
 */
const sendRequest = async (url, method, data) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    });

    // Check if the response status is not okay (e.g., non-2xx status code)
    if (!response.ok) {
      throw new Error('Request failed');
    }

    // Parse and return the JSON response data
    return await response.json();
  } catch (error) {
    return error; // Return the error in case of any issues
  }
};

export const httpServices = () => {
  return {
    /**
     * Fetch a list of advertisements from the API.
     * @returns {Promise} A promise that resolves to the list of advertisements.
     */
    async get() {
      const url = `${BASE_API}${END_POINTS.ADS}`;
      return sendRequest(url, METHOD_API.GET);
    },

    /**
     * Add a new advertisement to the API.
     * @param {object} data - The data of the advertisement to be added.
     * @returns {Promise} A promise that resolves to the newly added advertisement.
     */
    async post(data) {
      const url = `${BASE_API}${END_POINTS.ADS}`;
      return sendRequest(url, METHOD_API.POST, data);
    },

    /**
     * Update the information of an advertisement using the PUT method.
     * @param {number} id - The ID of the advertisement to be updated.
     * @param {object} data - The updated data for the advertisement.
     * @returns {Promise} A promise that resolves to the updated advertising data.
     */
    async put(id, data) {
      const url = `${BASE_API}${END_POINTS.ADS}${id}`;
      return sendRequest(url, METHOD_API.PUT, data);
    },

    /**
     * Delete an advertisement by its ID using the DELETE method.
     * @param {number} id - The ID of the advertisement to be deleted.
     * @returns {Promise} A promise that resolves to the deleted advertisement.
     */
    async delete(id) {
      const url = `${BASE_API}${END_POINTS.ADS}${id}`;
      return sendRequest(url, METHOD_API.DELETE);
    },

    /**
     * Get the information of an advertisement using the GET method.
     * @param {number} id - The ID of the advertisement to be updated.
     * @returns {Promise} A promise that resolves to the updated advertising data.
     */
    async getDetail(id) {
      const url = `${BASE_API}${END_POINTS.ADS}/${id}`;
      return sendRequest(url, METHOD_API.GET);
    },
  };
};
