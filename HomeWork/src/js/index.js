//Global app controller
import Model from './modules/Model';
import View from './views/View';
class Controller {
  constructor(Model, View) {
    this.model = Model;
    this.view = View;
    this.view.bindSelectedCategory();
    this.view.bindAddProduct(this.onhandleAddProduct.bind(this));
    this.model.bindToProductListChanged(this.onListChanged.bind(this));
    this.view.bindToButtonEdit(this.onhandleCurrentItem.bind(this));
    this.onListChanged(this.model.lists);
    this.view.bindToDisplayNone();
    this.view.bindDeleteProduct(this.onhandleButtonDelete.bind(this));
    this.view.bindUpdateProduct(this.onhandleButtonUpdate.bind(this));
    this.view.bindDeleteAllProduct(this.onhandleButtonDeleteAll.bind(this));
  }

  onListChanged(lists) {
    this.view.displayProducts(lists);
  }
  onhandleAddProduct(listObj) {
    this.model.addProduct(listObj);
  }
  onhandleCurrentItem(id) {
    this.model.onCurrentItem(id);
  }
  onhandleButtonDelete() {
    this.model.onDeleteItem();
  }
  onhandleButtonDeleteAll() {
    this.model.onDeleteAllItem();
  }
  onhandleButtonUpdate(obj) {
    this.model.onUpdateItem(obj);
  }
  onhandleButtonBack() {
    this.view.onChangeDisplayStyle();
  }
}

const app = new Controller(new Model(), new View());
