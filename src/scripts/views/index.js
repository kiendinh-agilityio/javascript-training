import { generateModalAds, toggleDropdown } from '../utils/index';
import { DISPLAY_CLASS, TITLE_MODAL, MESSAGE } from '../constants/index';
import { generateListAds } from '../templates/generateAdsList';
import { adsSearchElement } from '../dom/index';

export class AdsView {
  constructor() {
    this.initElementsAds();
    this.initEventListenersAds();
    this.initializeSearchInput();
    this.deleteHandler = null; // Track the delete handler
  }

  /**
   * Initializes the DOM elements used by AdsView.
   */
  initElementsAds() {
    this.modalAds = document.getElementById('modal');
    this.btnAdd = document.getElementById('btn-add');
    this.btnLogout = document.querySelector('.btn-logout');
    this.tableElement = document.getElementById('list-ads');
    this.searchButton = adsSearchElement.querySelector('#search-button');
    this.searchInput = adsSearchElement.querySelector('#search-input');
    this.btnClearSearch = adsSearchElement.querySelector('#btn-clear-search');
    this.deleteModal = document.getElementById('delete-modal');
    this.confirmDeleteButton = this.deleteModal.querySelector('#confirm-delete');
    this.cancelDeleteButton = this.deleteModal.querySelector('#cancel-delete');
    this.closeDeleteModalButton = this.deleteModal.querySelector('#close-modal');
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

    // Add click event to handle delete button clicks
    this.tableElement.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('.dropdown-content button:last-child');

      if (deleteButton) {
        // data-id button "Delete"
        const adId = parseInt(deleteButton.getAttribute('data-id'));

        // Show modal or perform other actions based on adId
        this.showDeleteModal(adId);
        this.bindDeleteUserHandler(adId);
      }
    });

    // Add event for confirm delete button
    this.confirmDeleteButton.addEventListener('click', () => {
      const adId = parseInt(this.confirmDeleteButton.getAttribute('data-id'));
      this.hideDeleteModal();
      this.deleteHandler(adId);
    });

    // Add event for cancel delete
    this.cancelDeleteButton.addEventListener('click', () => {
      this.hideDeleteModal();
    });

    // Add event for button close modal confirm
    this.closeDeleteModalButton.addEventListener('click', () => {
      this.hideDeleteModal();
    });

    this.deleteModal.addEventListener('click', (event) => {
      if (event.target === this.deleteModal) {
        this.hideDeleteModal();
      }
    });
  }

  /**
   * Initializes the search input and handles its events.
   */
  initializeSearchInput() {
    this.searchInput.addEventListener('input', () => {
      const inputValue = this.searchInput.value.trim();
      this.btnClearSearch.style.display = inputValue ? DISPLAY_CLASS.FLEX : DISPLAY_CLASS.HIDDEN;
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
  handleSearchNoResult() {
    this.tableElement.innerHTML = `<p class="search-result-message">${MESSAGE.NO_RESULT}</p>`;
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

    const closeDropdowns = (event) => {
      const isInsideDropdown = Array.from(dropdownContents).some(content => content.contains(event.target));

      if (!isInsideDropdown) {
        dropdownContents.forEach((content) => {
          content.style.display = DISPLAY_CLASS.HIDDEN;
        });
      }
    };

    dropdownButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const id = event.target.getAttribute('data-id');

        // Find the corresponding dropdown content
        const dropdownContent = this.tableElement.querySelector(`.dropdown-content[data-id="${id}`);

        // Hide other dropdown contents
        closeDropdowns(event);

        // Toggle the selected dropdown content
        toggleDropdown(dropdownContent);
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', closeDropdowns);
  }

  /**
   * Binds the delete user handler to the confirmation modal buttons.
   * @param {number} adId - The ID of the ad to be deleted.
   */
  bindDeleteUserHandler(adId) {
    this.confirmDeleteButton.setAttribute('data-id', adId);
    this.showDeleteModal();
  }

  /**
   * Binds the delete user handler to the table element.
   * @param {Function} handler - The handler function for deleting an ad.
   */
  bindDeleteUser(handler) {
    this.deleteHandler = handler;
  }

  /**
   * Displays the delete modal.
   */
  showDeleteModal() {
    this.deleteModal.style.display = DISPLAY_CLASS.FLEX;
  }

  /**
   * Hides the delete modal.
   */
  hideDeleteModal() {
    this.deleteModal.style.display = DISPLAY_CLASS.HIDDEN;
  }
};
