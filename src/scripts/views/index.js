import { generateModalAds, toggleDropdown } from '../utils/index';
import { DISPLAY_CLASS, TITLE_MODAL } from '../constants/index';
import { generateListAds } from '../templates/generateAdsList';

/**
 * Represents the AdsView class for handling the advertisement view.
 */
export class AdsView {
  /**
   * Initializes the AdsView class.
   */
  constructor() {
    // Initialize HTML elements used in the view.
    this.initElementsAds();
    // Set up event listeners for these elements.
    this.initEventListenersAds();
  }

  /**
   * Initializes HTML elements used in the view.
   */
  initElementsAds() {
    this.modalAds = document.getElementById('modal');
    this.btnAdd = document.getElementById('btn-add');
    this.btnLogout = document.querySelector('.btn-logout');
    this.tableElement = document.getElementById('list-ads');
  }

  /**
   * Initializes event listeners for user interactions.
   */
  initEventListenersAds() {
    // Add a click event listener to the "Add" button.
    this.btnAdd.addEventListener('click', this.showAddAdsModal.bind(this));

    // Add a click event listener to the modal to close it when clicked outside.
    this.modalAds.addEventListener('click', (event) => {
      if (event.target === this.modalAds) {
        this.closeModalHandler();
      }
    });

    // Handle clicking outside of dropdowns to close them.
    document.addEventListener('click', (event) => {
      const dropdownContents = document.querySelectorAll('.dropdown-content');
      dropdownContents.forEach((content) => {
        content.style.display = DISPLAY_CLASS.HIDDEN;
      });
    });
  }

  /**
   * Display the "Add Advertisement" modal dialog.
   */
  showAddAdsModal() {
    const modalContent = generateModalAds(null, TITLE_MODAL.ADD);
    this.modalAds.innerHTML = modalContent;
    this.modalAds.style.display = DISPLAY_CLASS.FLEX;

    const closeBtn = this.modalAds.querySelector('#close-modal-ads');
    const cancelBtn = this.modalAds.querySelector('#add-ads-cancel');

    closeBtn.addEventListener('click', this.closeModalHandler.bind(this));
    cancelBtn.addEventListener('click', this.closeModalHandler.bind(this));
  }

  /**
   * Close the modal dialog.
   */
  closeModalHandler() {
    this.modalAds.style.display = DISPLAY_CLASS.HIDDEN;
  }

  /**
   * Set up a handler for the "Logout" button.
   * @param {function} handler - The event handler for the "Logout" button.
   */
  setLogoutHandler(handler) {
    this.btnLogout.addEventListener('click', handler);
  }

  /**
   * Display the list of advertisements.
   * @param {Array} adsData - The data for the advertisements.
   */
  displayAdsList(adsData) {
    const adsListHTML = generateListAds(adsData);
    this.tableElement.innerHTML = adsListHTML;

    // Get all dropdown buttons and their associated content.
    const dropdownButtons = this.tableElement.querySelectorAll('.btn-dropdown');
    const dropdownContents = this.tableElement.querySelectorAll('.dropdown-content');

    // Iterate through each dropdown button and add a click event listener.
    dropdownButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        // Prevent the click event from propagating to parent elements.
        event.stopPropagation();

        // Get the data-id attribute of the clicked dropdown button.
        const id = event.target.getAttribute('data-id');

        // Find the corresponding dropdown content with the matching data-id.
        const dropdownContent = this.tableElement.querySelector(`.dropdown-content[data-id="${id}"]`);

        // Hide all dropdown contents before displaying the new one.
        dropdownContents.forEach((content) => {
          content.style.display = DISPLAY_CLASS.HIDDEN;
        });

        // Call the toggleDropdown function to show or hide the dropdown content.
        toggleDropdown(dropdownContent);
      });
    });
  }
}
