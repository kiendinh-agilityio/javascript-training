import { httpServices } from '../services/httpServices';
import { MESSAGE, ROLE_STATUS } from '../constants/index';

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
  async deleteAds(adsId) {
    try {
      await httpServices().delete(`/${adsId}`);
    } catch {
      console.error(MESSAGE.DELETE_ERROR);
    }
  }

  /**
   * A method to add a new advertisement.
   * @param {object} ad - The advertisement data to be added.
   * @returns {Promise} - A promise that resolves when the addition is successful or rejects with an error.
   */
  async addAds(adsItem) {
    try {
      // Check the condition for statusID and update adsItem
      const newAds = {
        ...adsItem,
        statusID: adsItem.status.includes('Active') ? ROLE_STATUS.ACTIVE : ROLE_STATUS.PAUSED,
      };

      // Send a POST request with the updated data
      const response = await httpServices().post(newAds);

      return response;
    } catch (error) {
      console.error(MESSAGE.ADD_ERROR);
    }
  }

  /**
   * Asynchronously retrieves detailed information for a specific advertisement using its unique identifier.
   * @param {string} id - The unique identifier of the advertisement.
   * @returns {Promise<Object>} - A promise that resolves to the detailed information of the advertisement.
   */
  async getAdsDetail(id) {
    try {
      // Make an asynchronous request to the server to get detailed information for the specified advertisement.
      const response = await httpServices().getDetail(id);

      // Save the retrieved detailed information to the adsDetail property of the current instance.
      this.adsDetail = response;

      return response;
    } catch (error) {
      console.error(MESSAGE.GET_DETAIL_ID_ERROR);
    }
  }

  /**
   * A method to edit an existing advertisement by ID.
   * @param {number} adsId - The ID of the ad to be edited.
   * @param {object} updatedAdsItem - The updated data of the ad.
   * @returns {Promise} - A promise that resolves when the editing is successful or rejects with an error.
   */
  async editAds(adsId, updatedAdsItem) {
    try {
      // Check the condition for statusID and update updatedAdsItem
      updatedAdsItem.statusID = updatedAdsItem.status.includes('Active') ? ROLE_STATUS.ACTIVE : ROLE_STATUS.PAUSED;

      // Send a PUT or PATCH request with the updated data
      const response = await httpServices().put(`/${adsId}`, updatedAdsItem);

      return response;
    } catch (error) {
      console.error(MESSAGE.EDIT_ERROR);
    }
  }
}
