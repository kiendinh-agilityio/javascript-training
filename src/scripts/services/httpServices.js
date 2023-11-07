import { MOCK_API } from '../constants/index';

export const httpServices = () => {
  return {
    /**
     * Fetch a list of advertisements from the API.
     * @returns A data containing the list of advertisements.
     */
    async get() {
      const url = `${MOCK_API}/ads`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return data;
    },

    /**
     * Add a new advertisement to the API.
     * @param {Object} data - The data of the advertisement to be added.
     * @returns A data containing the newly added advertisement.
     */
    async post(data) {
      const url = `${MOCK_API}/ads`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      return responseData;
    },

    /**
     * Update the information of an advertisement using the PUT method.
     * @param {number} id - The ID of the advertisement to be updated.
     * @param {Object} data - The updated data for the advertisement.
     * @returns Advertising data has been updated.
     */
    async put(id, data) {
      const url = `${MOCK_API}/ads/${id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      return responseData;
    },

    /**
     * Delete an advertisement by its ID using the DELETE method.
     * @param {number} id - The ID of the advertisement to be deleted.
     * @returns A data containing the deleted advertisement.
     */
    async delete(id) {
      const url = `${MOCK_API}/ads/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      return responseData;
    },
  };
};
