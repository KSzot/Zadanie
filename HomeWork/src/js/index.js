//Global app controller
import Model from './modules/Model';
import View from './views/View';
class Controller {
  constructor(Model, View) {
    this.model = Model;
    this.view = View;
    this.view.bindSelectedCategory();
  }
}

const app = new Controller(new Model(), new View());
