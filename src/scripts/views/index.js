import { generateModalAds, toggleDropdown } from '../utils/index';
import { DISPLAY_CLASS, TITLE_MODAL } from '../constants/index';

export class AdsView {
  constructor() {
    this.dropdown = document.getElementById('dropdown');
    this.dropdownContent = this.dropdown.querySelector('#dropdown-content');
    this.dropdownBtn = this.dropdown.querySelector('#btn-dropdown');
    this.modalAds = document.getElementById('modal');
    this.btnAdd = document.getElementById('btn-add');
    this.btnAdd.addEventListener('click', this.showAddAdsModal.bind(this));

    this.modalAds.addEventListener('click', (event) => {
      if (event.target === this.modalAds) {
        this.closeModalHandler();
      }
    });

    // Call the setup Dropdown Menu function here to set up the dropdown
    this.setupDropdownMenu();
  }

  showAddAdsModal() {
    // Hide dropdown before showing modal
    this.closeDropdown();

    const modalContent = generateModalAds(null, TITLE_MODAL.ADD);
    this.modalAds.innerHTML = modalContent;
    this.modalAds.style.display = DISPLAY_CLASS.FLEX;

    const closeBtn = this.modalAds.querySelector('#close-modal-ads');
    const cancelBtn = this.modalAds.querySelector('#add-ads-cancel');

    closeBtn.addEventListener('click', this.closeModalHandler.bind(this));
    cancelBtn.addEventListener('click', this.closeModalHandler.bind(this));
  }

  closeModalHandler() {
    this.modalAds.style.display = DISPLAY_CLASS.HIDDEN;
  }

  setupDropdownMenu() {
    this.dropdownBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleDropdown(this.dropdownContent);
    });

    // Handle click events anywhere else on the page to hide the dropdown button group
    document.addEventListener('click', (event) => {
      if (!this.modalAds.contains(event.target)) {
        this.closeDropdown();
      }
    });
  }

  // Hide dropdown
  closeDropdown() {
    this.dropdownContent.style.display = DISPLAY_CLASS.HIDDEN;
  }
}
