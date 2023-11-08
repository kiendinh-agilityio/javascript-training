/**
 * Represents the AdsController class for managing the interaction between the AdsModel and AdsView.
 */
export class AdsController {
  constructor(model, view) {
    // Initialize the model and view
    this.model = model;
    this.view = view;
    this.initialize();

    // Assign the logout handler from the view
    this.view.setLogoutHandler(this.handleLogout.bind(this));
  }

  /**
   * Handles the logout action by redirecting to the 'authen.html' page.
   */
  handleLogout() {
    window.location.href = 'authen.html';
  }

  /**
   * Initializes the controller by fetching ads data and updating the view.
   */
  async initialize() {
    try {
      const data = await this.model.fetchAdsData();
      if (this.model.error) {
        // Display an error in the view if there's an error in the model.
        this.view.displayError(this.model.error);
      } else {
        // Display the ads list in the view.
        this.view.displayAdsList(data);
      }
    } catch (error) {
      // Handle any unexpected errors and display them in the view.
      this.view.displayError(error);
    }
  }
}
