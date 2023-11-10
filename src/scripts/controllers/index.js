import { debounce, delayActions, showToast } from '../utils/index';
import { SPECIAL_KEYS, MESSAGE } from '../constants/index';

/**
 * Represents the AdsController class for handling the business logic and user interactions.
 */
export class AdsController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initialize();

    // Set logout handler for the view
    this.view.setLogoutHandler(this.handleLogout.bind(this));

    // Add event listeners for search and clear search buttons
    this.view.searchButton.addEventListener('click', this.handleSearch.bind(this));
    this.view.btnClearSearch.addEventListener('click', this.handleClearSearch.bind(this));

    // Initialize debounced search handling
    this.handleSearchDebounced = debounce(this.handleSearch.bind(this), 500);

    // Add event listeners for real-time search
    this.view.searchInput.addEventListener('input', () => {
      this.handleSearchDebounced();
    });

    // Add event listener for pressing Enter key in the search input
    this.view.searchInput.addEventListener('keypress', (event) => {
      if (event.key === SPECIAL_KEYS.ENTER) {
        this.handleSearch();
      }
    });

    // Bind delete handler to the view
    this.view.bindDeleteUser(this.handleDeleteUser.bind(this));
  }

  /**
   * Handles the logout action by redirecting to 'authen.html'.
   */
  handleLogout() {
    window.location.href = 'authen.html';
  }

  /**
   * Initializes the AdsController and fetches the initial data.
   */
  async initialize() {
    try {
      const data = await this.model.fetchAdsData();

      // Display error if there's an issue with data retrieval
      if (this.model.error) {
        this.view.displayError(this.model.error);
      } else {
        this.view.displayAdsList(data);
      }
    } catch (error) {
      this.view.displayError(error);
    }
  }

  /**
   * Handles the search action.
   */
  async handleSearch() {
    const keyword = this.view.searchInput.value.trim().toLowerCase();

    // Check if a keyword is present and if ad data needs to be loaded
    if (keyword && (!this.model.adsData.length || this.model.error)) {
      await this.model.fetchAdsData();

      // Handle any error that occurred during data fetching
      if (this.model.error) {
        this.view.displayError(this.model.error);
        return;
      }
    }

    // Filter the adsData based on the entered keyword in the search input.
    const filteredAds = this.model.adsData.filter((adsItem) => {
      const { network = '', link = '', email = '', phone = '' } = adsItem || {};

      return network.includes(keyword) || email.includes(keyword) || phone.includes(keyword) || link.includes(keyword);
    });

    // Display matching ads if results are found
    if (filteredAds.length) {
      this.view.displayAdsList(filteredAds);
    } else {
      this.view.handleSearchNoResult();
    }
  }

  /**
   * Handles clearing the search input and displaying the initial data.
   */
  handleClearSearch() {
    this.initialize();
  }

  /**
   * Handles the user deletion.
   * @param {number} adsId - The ID of the ad to be deleted.
   */
  async handleDeleteUser(adsId) {
    // Introduce a delay before actually deleting the ad
    delayActions(async () => {
      // Delete the ad from the model
      await this.model.deleteAd(adsId);

      // Filter out the deleted ad from the adsData list
      const updatedAdsData = this.model.adsData.filter((ads) => ads.id !== adsId);

      // Display the updated list of ads
      this.view.displayAdsList(updatedAdsData);

      // Return to the initial state
      this.initialize();

      // Show a success notification
      showToast(MESSAGE.DELETE_SUCCESS, 'icon-success.svg', true);
    });
  }
}
