import { BASE_API, END_POINTS, METHOD_API } from '../constants/index';

export const httpServices = () => {
  return {
    /**
     * Fetch a list of advertisements from the API.
     * @returns A data containing the list of advertisements.
     */
    async get() {
      try {
        const url = `${BASE_API}${END_POINTS.ADS}`;
        const response = await fetch(url, {
          method: METHOD_API.GET,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        return data;
      } catch (error) {
        return error;
      }
    },

    /**
     * Add a new advertisement to the API.
     * @param {Object} data - The data of the advertisement to be added.
     * @returns A data containing the newly added advertisement.
     */
    async post(data) {
      try {
        const url = `${BASE_API}${END_POINTS.ADS}`;
        const response = await fetch(url, {
          method: METHOD_API.POST,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const responseData = await response.json();
        return responseData;
      } catch (error) {
        return error;
      }
    },

    /**
     * Update the information of an advertisement using the PUT method.
     * @param {number} id - The ID of the advertisement to be updated.
     * @param {Object} data - The updated data for the advertisement.
     * @returns Advertising data has been updated.
     */
    async put(id, data) {
      try {
        const url = `${BASE_API}${END_POINTS.ADS}${id}`;
        const response = await fetch(url, {
          method: METHOD_API.PUT,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const responseData = await response.json();
        return responseData;
      } catch (error) {
        return error;
      }
    },

    /**
     * Delete an advertisement by its ID using the DELETE method.
     * @param {number} id - The ID of the advertisement to be deleted.
     * @returns A data containing the deleted advertisement.
     */
    async delete(id) {
      try {
        const url = `${BASE_API}${END_POINTS.ADS}${id}`;
        const response = await fetch(url, {
          method: METHOD_API.DELETE,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const responseData = await response.json();
        return responseData;
      } catch (error) {
        return error;
      }
    },
  };
};
