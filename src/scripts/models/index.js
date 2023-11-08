import { httpServices } from '../services/httpServices';

/**
 * Represents the AdsModel class for managing advertisement data.
 */
export class AdsModel {
  constructor() {
    // Initialize the advertisement data and error state.
    this.adsData = [];
    this.error = null;
  }

  /**
   * Asynchronously fetches advertisement data from an HTTP service.
   * @returns {Promise} A promise that resolves with the HTTP response or rejects with an error.
   */
  async fetchAdsData() {
    try {
      // Send an HTTP GET request to retrieve advertisement data.
      const response = await httpServices().get();
      this.adsData = response.data;
      return response;
    } catch (error) {
      // Handle errors by storing the error in the model.
      this.error = error;
    }
  }
}
