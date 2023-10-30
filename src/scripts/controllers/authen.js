export class AuthenController {
  constructor(view) {
    this.view = view;
    this.view.handleSigninClick();
  }
}
