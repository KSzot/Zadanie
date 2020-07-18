//Global app controller
import Model from './modules/Model';
import View from './views/View';
class Controller {
  constructor(Model, View) {
    this.model = Model;
    this.view = View;
    this.view.bindSelectedCategory();
    this.view.bindAddProduct(this.onhandleAddTodo.bind(this));
    this.model.bindToProductListChanged(this.onListChanged.bind(this));
    this.onListChanged(this.model.lists);
  }

  onListChanged(lists) {
    this.view.displayProducts(lists);
  }
  onhandleAddTodo(listObj) {
    this.model.addProduct(listObj);
  }
}

const app = new Controller(new Model(), new View());
