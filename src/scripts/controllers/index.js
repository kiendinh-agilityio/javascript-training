import { debounce, delayAction, showToast, stopLoadingSpinner } from '../../scripts/utils/index';
import { SPECIAL_KEYS, MESSAGES, SORT_VALUE, DEBOUNCE_TIME, ICONS, REGEX } from '../../scripts/constants/index';

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
    this.view.searchButton.addEventListener(
      'click',
      this.handleSearch.bind(this),
    );
    this.view.btnClearSearch.addEventListener(
      'click',
      this.handleClearSearch.bind(this),
    );

    // Initialize debounced search handling
    this.handleSearchDebounced = debounce(this.handleSearch.bind(this), DEBOUNCE_TIME);

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
    this.view.bindDeleteAds(this.handleDeleteAds.bind(this));

    // Bind add hander to the view
    this.view.bindAddAds(this.handleAddAds.bind(this));

    // Bind edit handler to the view
    this.view.bindEditAds(this.handleEditAds.bind(this));

    // Add event edit
    this.view.bindGetDetailAds(this.handleGetDetailAds.bind(this));

    // Event Sort
    this.view.setSortHandler(this.handleSort.bind(this));
  }

  /**
   * Handles the logout action by redirecting to 'authen.html'.
   */
  handleLogout() {
    window.location.href = 'authen';
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

    // Remove spaces in the keyword
    const formattedKeyword = keyword.replace(REGEX.KEYWORD, '');

    // Filter the adsData based on the entered keyword in the search input.
    const filteredAds = this.model.adsData.filter((adsItem) => {
      const { network = '', link = '', email = '', phone = '' } = adsItem || {};

      // Remove spaces and convert to lowercase
      const formattedNetwork = network.replace(REGEX.KEYWORD, '').toLowerCase();

      return (
        formattedNetwork.includes(formattedKeyword) ||
        email.includes(formattedKeyword) ||
        phone.includes(formattedKeyword) ||
        link.includes(formattedKeyword)
      );
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
  async handleDeleteAds(adsId) {
    // Introduce a delay before actually deleting the ad
    delayAction(async () => {
      // Delete the ad from the model
      const response = await this.model.deleteAds(adsId);

      // Filter out the deleted ad from the adsData list
      const updatedAdsData = this.model.adsData.filter(
        (ads) => ads.id !== adsId,
      );

      // Display the updated list of ads
      this.view.displayAdsList(updatedAdsData);

      // Return to the initial state
      await this.initialize();

      if (response) {
        stopLoadingSpinner();
      }

      // Show a success notification
      showToast(MESSAGES.DELETE_SUCCESS, ICONS.SUCCESS, true);
    });
  }

  /**
   * Handles the asynchronous addition of new ads.
   * @param {object} newAds - The data of the new ad to be added.
   */
  async handleAddAds(newAds) {
    // Introduce a delay before adding the new ad
    delayAction(async () => {
      // Send a request to add the new ad and await the response
      const response = await this.model.addAds(newAds);

      // Update this.model.adsData with the new data from the response
      this.model.adsData.push(response);

      // Refresh adsData after adding
      await this.model.fetchAdsData();

      // Display the list of ads after adding
      this.view.displayAdsList(this.model.adsData);

      // Return to the initial state
      await this.initialize();

      if (response) {
        stopLoadingSpinner();
      }

      showToast(MESSAGES.DELETE_SUCCESS, ICONS.SUCCESS, true);
    });
  }

  // Show the ads modal with the given adsData
  handleShowAdsModal(adsData) {
    this.view.showAdsModal(adsData);
  }

  /**
   * Handles the asynchronous editing of existing ads.
   * @param {number} adsId - The ID of the ad to be edited.
   * @param {object} updatedAdsItem - The updated data of the ad.
   */
  async handleEditAds(adsId, updatedAdsItem) {
    // Introduce a delay before actually editing the ad
    delayAction(async () => {
      // Edit the ad in the model
      const response = await this.model.editAds(adsId, updatedAdsItem);

      // Find the edited ad in the adsData array
      const editedAd =
        this.model.adsData.find((ads) => ads.id === adsId) || null;

      // Update the edited ad with the response data
      editedAd && Object.assign(editedAd, response);

      // Display the updated list of ads
      this.view.displayAdsList(this.model.adsData);

      // Return to the initial state
      await this.initialize();

      if (response) {
        stopLoadingSpinner();
      }

      // Show a success notification
      showToast(MESSAGES.DELETE_SUCCESS, ICONS.SUCCESS, true);
    });
  }

  /**
   * Asynchronously handles the retrieval of detailed information for a specific advertisement.
   * @param {string} adsId - The unique identifier of the advertisement.
   */
  async handleGetDetailAds(adsId) {
    // Await the retrieval of detailed advertisement information using the provided adsId.
    await this.model.getAdsDetail(adsId);

    // Display the advertisement modal with the retrieved details from the model.
    this.view.showAdsModal(this.model.adsDetail);
  }

  /**
   * Sorts the adsData based on the specified column and order.
   * @param {number} columnIndex - The index of the column to sort.
   * @param {string} sortOrder - The sort order ('asc' or 'desc').
   */
  sortAdsData(columnIndex, sortOrder) {
    const columnName = this.getColumnKey(columnIndex);

    // Sort the data
    this.model.adsData = this.model.adsData.sort((a, b) => {
      // Convert column values to strings and convert to lowercase (handling null values)
      const valueA = String(a[columnName]).toLowerCase() || '';
      const valueB = String(b[columnName]).toLowerCase() || '';

      // Compare the string values of two elements
      const result = valueA.localeCompare(valueB);

      // Reverse the result if sortOrder is 'desc'
      return sortOrder === SORT_VALUE.ASC ? result : -result;
    });

    this.view.displayAdsList(this.model.adsData);
  }

  /**
   * Gets the corresponding key for the given column index.
   * @param {number} columnIndex - The index of the column.
   * @returns {string} - The key of the column.
   */
  getColumnKey(columnIndex) {
    switch (columnIndex) {
      case 0:
        return 'network';
      case 1:
        return 'status';
      default:
        return '';
    }
  }

  /**
   * Handles the sorting of columns.
   * @param {number} columnIndex - The index of the column to sort.
   * @param {string} sortOrder - The sort order ('asc' or 'desc').
   */
  handleSort(columnIndex, sortOrder) {
    this.sortAdsData(columnIndex, sortOrder);
  }
}
