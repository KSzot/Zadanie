export default class Model {
  constructor() {
    this.lists = [
      { id: 1, category: 'Vegetables', product: 'Carrot', price: '12' },
    ];
  }

  addProduct(name, product, price) {
    const element = {
      id: new Date(),
      category: name,
      product: product,
      price: price,
    };
    this.lists.push(element);
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
}
