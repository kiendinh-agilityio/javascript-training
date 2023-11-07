export class AdsController {
  constructor(model, view) {
    // Initialize the model and view
    this.model = model;
    this.view = view;

    // Assign the logout handler from the view
    this.view.setLogoutHandler(this.handleLogout.bind(this));
  }

  // Handle the logout action
  handleLogout() {
    window.location.href = 'authen.html';
  }
}
