export default class Model {
  constructor() {
    this.lists = [
      { id: 1, category: 'Vegetables', product: 'Carrot', price: '12' },
      { id: 2, category: 'Diary', product: 'CNieast', price: '1233' },
    ];
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
    this.onListChanged(this.lists);
  }

  editProduct(id, updateName, updateProduct, updatePrice) {
    this.lists = this.lists.map((item) =>
      item.id === id
        ? {
            id: item.id,
            category: updateName,
            product: updateProduct,
            price: updatePrice,
          }
        : item,
    );
  }

  deleteProduct(id) {
    this.lists = this.lists.filter((item) => item.id !== id);
  }

  bindToProductListChanged(callback) {
    this.onListChanged = callback;
  }
}
