import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import printMe from './print';
import '../css/main.scss';

import View from './views/View';
import Model from './modules/Model';

class Controller {
  constructor(View, Model) {
    this.view = View;
    this.model = Model;
    this.view.bindDropdownShow();
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

const app = new Controller(new View(), new Model());

// function component() {
//   const element = document.createElement('div');
//   const button = document.createElement('button');
//   button.innerHTML = 'Click Me';
//   button.onclick = printMe;
//   element.innerHTML = 'Click this button -> ';
//   element.appendChild(button);
//   element.appendChild(button2);

//   return element;
// }

// document.body.appendChild(component());
