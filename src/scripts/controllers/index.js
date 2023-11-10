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
    // Check if search input value is present and not null
    if (this.view.searchInput && this.view.searchInput.value !== null) {
      const keyword = this.view.searchInput.value.trim().toLowerCase();

      try {
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

          // Check if any property includes the keyword
          return network.includes(keyword) || email.includes(keyword) || phone.includes(keyword) || link.includes(keyword);
        });

        // Display matching ads if results are found
        filteredAds.length ? this.view.displayAdsList(filteredAds) : this.view.handleSearchNoResult();
      } catch (error) {
        // Handle any unexpected error during the search process
        this.view.displayError(error);
      }
    } else {
      this.view.displayError(error);
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
   * @param {number} adId - The ID of the ad to be deleted.
   */
  async handleDeleteUser(adId) {
    try {
      // Call delayActions to introduce a delay before actually deleting the user
      delayActions(async () => {
        await this.model.deleteAd(adId);

        const updatedAdsData = this.model.adsData.filter((ad) => ad.id !== adId);

        this.view.displayAdsList(updatedAdsData);
        this.initialize();

        showToast(MESSAGE.DELETE_SUCCESS, 'icon-success.svg', true);
      });
    } catch (error) {
      this.view.displayError(error);
    }
  }
}
