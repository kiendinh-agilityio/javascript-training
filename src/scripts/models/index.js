import { httpServices } from '../services/httpServices';

export class AdsModel {
  constructor() {
    this.adsData = [];
    this.error = null;
  }

  /**
   * A method to fetch data from the server with an optional query parameter.
   * @param {string} query - The query parameter to be added to the request.
   * @returns {Promise} - A promise that resolves with the response data or rejects with an error.
   */
  async fetchAdsData(query = '') {
    try {
      const response = await httpServices().get(query);

      // Save the response data to the adsData array
      this.adsData = response;

      return response;
    } catch (error) {
      this.error = error;
    }
  }

  /**
   * A method to search for advertisements based on a keyword.
   * @param {string} keyword - The keyword to use for searching.
   * @returns {Promise} - A promise that resolves with the response data or rejects with an error.
   */
  async searchAdsByKeyword(keyword) {
    return this.fetchAdsData(`?search=${keyword}`);
  }

  /**
   * A method to delete an advertisement by ID.
   * @param {number} adsId - The ID of the ad to be deleted.
   * @returns {Promise} - A promise that resolves when the deletion is successful or rejects with an error.
   */
  async deleteAd(adsId) {
    try {
      await httpServices().delete(`/${adsId}`);
    } catch (error) {
      return error;
    }
  }
}
