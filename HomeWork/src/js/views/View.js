export default class View {
  constructor() {
    this.dropdownWrapper = document.querySelector('.custom-select-wrapper');
    this.category = document.querySelector('.custom-select__trigger span');
    this.values = document.querySelectorAll('input');
    this.listProduct = document.querySelectorAll('ul');
    this.totalPrice = document.querySelector('.heading-secondary span');
  }

  get _getValues() {
    if (
      this.category.textContent.length === 0 ||
      this.values[0].value.length === 0 ||
      this.values[1].value.length === 0
    ) {
      return null;
    } else {
      const obj = {
        category: this.category.textContent,
        product: this.values[0].value,
        price: this.values[1].value,
      };
      console.log(this.category.dataset.value);
      return obj;
    }
  }

  _resetInput() {
    this.values[0].value = '';
    this.values[1].value = '';
  }

  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  bindSelectedCategory() {
    this.dropdownWrapper.addEventListener('click', function (e) {
      this.querySelector('.custom-select').classList.toggle('open');
      for (const option of document.querySelectorAll('.custom-option')) {
        option.addEventListener('click', function () {
          if (!this.classList.contains('selected')) {
            this.parentNode
              .querySelector('.custom-option.selected')
              .classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select').querySelector(
              '.custom-select__trigger span',
            ).textContent = this.textContent;
          }
        });
      }
    });
  }

  displayProducts(listProducts) {
    let i = 0;
    let countPrice = 0;
    while (i < 3) {
      while (this.listProduct[i].firstChild) {
        this.listProduct[i].removeChild(this.listProduct[i].firstChild);
      }
      i++;
    }
    if (listProducts.length === 0) {
      console.log('Pusto');
    } else {
      listProducts.forEach((element) => {
        const li = this.createElement('li', 'product__item');
        li.id = element.id;
        const product = this.createElement('span', 'product__item--span');
        const price = this.createElement('span', 'product__item--span');
        product.textContent = element.product;
        price.textContent = `${element.price} $`;
        li.append(product, price);
        const category = element.category;
        this.elementUl = document.getElementById(category);
        countPrice += parseInt(element.price);
        this.elementUl.appendChild(li);
      });
      this.totalPrice.textContent = `${countPrice} $`;
    }
  }
  bindAddProduct(handler) {
    document.querySelector('.btn--add').addEventListener('click', (event) => {
      if (event.target.className === 'btn btn--add btn--lightblue') {
        if (this._getValues) {
          handler(this._getValues);
          this._resetInput();
        } else {
          console.log('Not work');
        }
      }
    });
  }
  _flattenDeep(arr1) {
    return arr1.reduce(
      (acc, val) =>
        Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
      [],
    );
  }
}
