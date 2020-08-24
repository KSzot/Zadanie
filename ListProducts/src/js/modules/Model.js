export default class Model {
  constructor() {
    this.lists = JSON.parse(localStorage.getItem('listOfProducts')) || [];
  }

  _updateFun(lists) {
    this.onListChanged(lists);
    localStorage.removeItem('listOfProducts');
    localStorage.setItem('listOfProducts', JSON.stringify(lists));
  }

  addProduct(obj) {
    const { category, product, count, weight } = obj;
    const element = {
      id: new Date().getTime(),
      category: category,
      product: product,
      count: count,
      weight: weight,
    };
    console.log('Work');
    this.lists.push(element);
    this._updateFun(this.lists);
  }

  deleteProduct(id) {
    this.lists = this.lists.filter((item) => item.id !== id);
  }

  bindToProductListChanged(callback) {
    this.onListChanged = callback;
  }
  onCurrentItem(id) {
    this.currentItem = id;
    console.log(this.currentItem);
  }
  onDeleteItem() {
    this.lists = this.lists.filter((item) => item.id != this.currentItem);
    this._updateFun(this.lists);
  }
  onUpdateItem(obj) {
    console.log(obj);
    const { category, product, count, weight } = obj;
    this.lists = this.lists.map((item) =>
      item.id == this.currentItem
        ? {
            id: item.id,
            category: category,
            product: product,
            count: count,
            weight: weight,
          }
        : item,
    );
    console.log(this.lists);
    this._updateFun(this.lists);
  }
  onDeleteAllItem() {
    this.lists = [];
    this._updateFun(this.lists);
  }
}
