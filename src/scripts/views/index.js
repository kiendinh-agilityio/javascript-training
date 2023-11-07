import { generateModalAds, toggleDropdown } from '../utils/index';
import { DISPLAY_CLASS, TITLE_MODAL } from '../constants/index';

export class AdsView {
  constructor() {
    this.initElementAds();
    this.initEventlistenersAds();
  }

  /** Initialize DOM elements */
  initElementAds() {
    this.dropdown = document.getElementById('dropdown');
    this.dropdownContent = this.dropdown.querySelector('#dropdown-content');
    this.dropdownBtn = this.dropdown.querySelector('#btn-dropdown');
    this.modalAds = document.getElementById('modal');
    this.btnAdd = document.getElementById('btn-add');
    this.btnLogout = document.querySelector('.btn-logout');
  }

  /** Initialize event listeners */
  initEventlistenersAds() {
    this.btnAdd.addEventListener('click', this.showAddAdsModal.bind(this));

    this.modalAds.addEventListener('click', (event) => {
      if (event.target === this.modalAds) {
        this.closeModalHandler();
      }
    });

    // Call the setup Dropdown Menu function here to set up the dropdown
    this.setupDropdownMenu();
  }

  /** Show the "Add Ads" modal */
  showAddAdsModal() {
    // Hide the dropdown before showing the modal
    this.closeDropdown();

    const modalContent = generateModalAds(null, TITLE_MODAL.ADD);
    this.modalAds.innerHTML = modalContent;
    this.modalAds.style.display = DISPLAY_CLASS.FLEX;

    const closeBtn = this.modalAds.querySelector('#close-modal-ads');
    const cancelBtn = this.modalAds.querySelector('#add-ads-cancel');

    closeBtn.addEventListener('click', this.closeModalHandler.bind(this));
    cancelBtn.addEventListener('click', this.closeModalHandler.bind(this));
  }

  /** Handle the modal closing */
  closeModalHandler() {
    this.modalAds.style.display = DISPLAY_CLASS.HIDDEN;
  }

  /** Set up the dropdown menu */
  setupDropdownMenu() {
    this.dropdownBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleDropdown(this.dropdownContent);
    });

    // Handle click events anywhere else on the page to hide the dropdown
    document.addEventListener('click', (event) => {
      if (!this.modalAds.contains(event.target)) {
        this.closeDropdown();
      }
    });
  }

  /** Hide the dropdown */
  closeDropdown() {
    this.dropdownContent.style.display = DISPLAY_CLASS.HIDDEN;
  }

  /** Add a click event for the logout button and call the handler from the controller */
  setLogoutHandler(handler) {
    this.btnLogout.addEventListener('click', handler);
  }
}
