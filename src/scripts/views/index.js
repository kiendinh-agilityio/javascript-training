import { generateModalAds, toggleDropdown } from '../utils/index';
import { DISPLAY_CLASS, TITLE_MODAL, MESSAGAE } from '../constants/index';
import { generateListAds } from '../templates/generateAdsList';

/**
 * Represents the AdsView class for handling the advertisement view.
 */
export class AdsView {
  constructor() {
    this.initElementsAds();
    this.initEventListenersAds();
    this.initializeSearchInput();
  }

  /**
   * Initializes the DOM elements used by AdsView.
   */
  initElementsAds() {
    this.modalAds = document.getElementById('modal');
    this.btnAdd = document.getElementById('btn-add');
    this.btnLogout = document.querySelector('.btn-logout');
    this.tableElement = document.getElementById('list-ads');
    this.searchButton = document.getElementById('search-button');
    this.searchInput = document.getElementById('search-input');
    this.btnClearSearch = document.getElementById('btn-clear-search');
  }

  /**
   * Initializes event listeners for AdsView.
   */
  initEventListenersAds() {
    this.btnAdd.addEventListener('click', this.showAddAdsModal.bind(this));
    this.modalAds.addEventListener('click', (event) => {
      if (event.target === this.modalAds) {
        this.closeModalHandler();
      }
    });

    // Clear search button click
    this.btnClearSearch.addEventListener('click', this.clearSearchHandler.bind(this));
  }

  /**
   * Initializes the search input and handles its events.
   */
  initializeSearchInput() {
    this.searchInput.addEventListener('input', () => {
      const inputValue = this.searchInput.value.trim();
      this.btnClearSearch.style.display = inputValue ? DISPLAY_CLASS.BLOCK : DISPLAY_CLASS.HIDDEN;
    });
  }

  /**
   * Shows the Add Ads modal.
   */
  showAddAdsModal() {
    const modalContent = generateModalAds(null, TITLE_MODAL.ADD);
    this.modalAds.innerHTML = modalContent;
    this.modalAds.style.display = DISPLAY_CLASS.FLEX;

    const closeBtn = this.modalAds.querySelector('#close-modal-ads');
    const cancelBtn = this.modalAds.querySelector('#add-ads-cancel');

    // Close modal button click and Cancel button click
    closeBtn.addEventListener('click', this.closeModalHandler.bind(this));
    cancelBtn.addEventListener('click', this.closeModalHandler.bind(this));
  }

  /**
   * Closes the modal.
   */
  closeModalHandler() {
    this.modalAds.style.display = DISPLAY_CLASS.HIDDEN;
  }

  /**
   * Sets a handler for the logout button.
   * @param {Function} handler - The handler function for the logout button.
   */
  setLogoutHandler(handler) {
    this.btnLogout.addEventListener('click', handler);
  }

  /**
   * Handles the case when no search results are found.
   */
  handleNoSearchResults() {
    const noResultsMessage = MESSAGAE.NO_RESULT;
    this.tableElement.innerHTML = `<p class="search-result-message">${noResultsMessage}</p>`;
  }

  /**
   * Clears the search input.
   */
  clearSearchHandler() {
    this.searchInput.value = '';
    this.btnClearSearch.style.display = DISPLAY_CLASS.HIDDEN;
    this.displayAdsList(this.adsData);
  }

  /**
   * Displays the list of ads in the table.
   * @param {Array} adsData - The list of ads to be displayed.
   */
  displayAdsList(adsData) {
    const adsListHTML = generateListAds(adsData);
    this.tableElement.innerHTML = adsListHTML;

    // Dropdown buttons
    const dropdownButtons = this.tableElement.querySelectorAll('.btn-dropdown');
    const dropdownContents = this.tableElement.querySelectorAll('.dropdown-content');

    dropdownButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const id = event.target.getAttribute('data-id');

        // Find the corresponding dropdown content
        const dropdownContent = this.tableElement.querySelector(`.dropdown-content[data-id="${id}`);

        // Hide other dropdown contents
        dropdownContents.forEach((content) => {
          content.style.display = DISPLAY_CLASS.HIDDEN;
        });

        // Toggle the selected dropdown content
        toggleDropdown(dropdownContent);
      });
    });
  }
}
