import { debounce } from '../utils/debounce';

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
      if (event.key === 'Enter') {
        this.handleSearch();
      }
    });
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
    try {
      if (keyword) {
        if (this.model.adsData.length === 0) {
          // Fetch data if it hasn't been loaded yet
          await this.model.fetchAdsData();
          if (this.model.error) {
            this.view.displayError(this.model.error);
            return;
          }
        }

        // Filter the adsData based on the keyword entered in the search input.
        const filteredAds = this.model.adsData.filter((item) => {
          const { network, link, email, phone } = item;
          const lowercaseKeyword = keyword.toLowerCase();

          return network.includes(lowercaseKeyword) || email.includes(lowercaseKeyword) || phone.includes(lowercaseKeyword) || link.includes(lowercaseKeyword);
        });

        if (filteredAds.length > 0) {
          // If there are results, display the matching ads list
          this.view.displayAdsList(filteredAds);
        } else {
          // If no results, display a message
          this.view.handleNoSearchResults();
        }
      } else {
        // If the search input is empty, return to the initial state
        this.initialize();
      }
    } catch (error) {
      this.view.displayError(error);
    }
  }

  /**
   * Handles clearing the search input and displaying the initial data.
   */
  handleClearSearch() {
    this.initialize();
  }
}
