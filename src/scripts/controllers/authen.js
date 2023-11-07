import { AuthenView } from '../views/authen';
import { AuthenModel } from '../models/authen';

export class AuthenController {
  constructor() {
    this.view = new AuthenView();
    this.model = new AuthenModel(this.view);

    this.view.controller = this;
  }

  login(email, password) {
    this.model.login(email, password);
  }
}
