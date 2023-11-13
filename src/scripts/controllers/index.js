import { debounce, delayActions, showToast } from '../../scripts/utils/index';
import { SPECIAL_KEYS, MESSAGE } from '../../scripts/constants/index';

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
    this.view.bindDeleteAds(this.handleDeleteAds.bind(this));

    // Bind add hander to the view
    this.view.bindAddAds(this.handleAddAds.bind(this));

    // Bind edit handler to the view
    this.view.bindEditAds(this.handleEditAds.bind(this));

    // add event edit
    this.view.bindGetDetailAds(this.handleGetDetailAds.bind(this));
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

      return (
        network.includes(keyword) ||
        email.includes(keyword) ||
        phone.includes(keyword) ||
        link.includes(keyword)
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
    delayActions(async () => {
      // Delete the ad from the model
      await this.model.deleteAds(adsId);

      // Filter out the deleted ad from the adsData list
      const updatedAdsData = this.model.adsData.filter(
        (ads) => ads.id !== adsId,
      );

      // Display the updated list of ads
      this.view.displayAdsList(updatedAdsData);

      // Return to the initial state
      this.initialize();

      // Show a success notification
      showToast(MESSAGE.DELETE_SUCCESS, 'icon-success.svg', true);
    });
  }

  /**
   * Handles the asynchronous addition of new ads.
   * @param {object} newAds - The data of the new ad to be added.
   */
  async handleAddAds(newAds) {
    // Introduce a delay before adding the new ad
    delayActions(async () => {
      // Send a request to add the new ad and await the response
      const response = await this.model.addAds(newAds);

      // Update this.model.adsData with the new data from the response
      this.model.adsData.push(response);

      // Refresh adsData after adding
      await this.model.fetchAdsData();

      // Display the list of ads after adding
      this.view.displayAdsList(this.model.adsData);

      // Return to the initial state
      this.initialize();

      // Show a success notification
      showToast(MESSAGE.ADD_SUCCESS, 'icon-success.svg', true);
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
    delayActions(async () => {
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
      this.initialize();

      // Assuming `editAds` method handles errors internally, you can directly show the success notification
      showToast(MESSAGE.EDIT_SUCCESS, 'icon-success.svg', true);
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
}
