export default class Model {
  constructor() {
    this.lists = [
      { id: 1, category: 'Vegetables', product: 'Carrot', price: '12' },
      { id: 2, category: 'Diary', product: 'CNieast', price: '1233' },
    ];
  }

  _updateFun(lists) {
    this.onListChanged(lists);
  }

  addProduct(obj) {
    const { category, product, price } = obj;
    const element = {
      id: new Date().getTime(),
      category: category,
      product: product,
      price: price,
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
  }
  onDeleteItem() {
    this.lists = this.lists.filter((item) => item.id != this.currentItem);
    this._updateFun(this.lists);
  }
  onUpdateItem(obj) {
    const { category, product, price } = obj;
    this.lists = this.lists.map((item) =>
      item.id == this.currentItem
        ? { id: item.id, category: category, product: product, price: price }
        : item,
    );
    this._updateFun(this.lists);
  }
  onDeleteAllItem() {
    this.lists = [];
    this._updateFun(this.lists);
  }
}
