export default class View {
  constructor() {
    this.dropdownWrapper = document.querySelector('.custom-select-wrapper');
    this.category = document.querySelector('.custom-select__trigger span');
    this.values = document.querySelectorAll('input');
    this.listProduct = document.querySelectorAll('ul');
    this.totalPrice = document.querySelector('.heading-secondary span');
    this.buttonAdd = document.querySelector('.btn--add');
    this.buttonDelete = document.querySelector('.btn--delete');
    this.buttonUpdate = document.querySelector('.btn--update');
    this.buttonBack = document.querySelector('.btn--back');
    this.buttonDeleteAll = document.querySelector('.header__button-box a');
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
      return obj;
    }
  }

  _resetInput() {
    this.values[0].value = '';
    this.values[1].value = '';
  }

  _onDisplayInlineBlock() {
    this.buttonAdd.style.display = 'none';
    this.buttonBack.style.display = 'inline-block';
    this.buttonDelete.style.display = 'inline-block';
    this.buttonUpdate.style.display = 'inline-block';
  }

  _onDisplayNone() {
    this.buttonAdd.style.display = 'inline-block';
    this.buttonBack.style.display = 'none';
    this.buttonDelete.style.display = 'none';
    this.buttonUpdate.style.display = 'none';
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
    while (i < this.listProduct.length) {
      while (this.listProduct[i].firstChild) {
        this.listProduct[i].removeChild(this.listProduct[i].firstChild);
      }
      i++;
    }
    if (listProducts.length === 0) {
      this.totalPrice.textContent = `${countPrice} $`;
    } else {
      listProducts.forEach((element) => {
        const li = this.createElement('li', 'product__item');
        li.id = element.id;
        const product = this.createElement('span', 'product__item--span');
        const price = this.createElement('span', 'product__item--span');
        const button = this.createElement('a', 'btn');
        button.classList.add('btn--edit');
        button.textContent = 'Edit';
        product.textContent = element.product;
        price.textContent = `${element.price} $`;
        li.append(product, price, button);
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

  bindToButtonEdit(handler) {
    this.listProduct.forEach((element) => {
      element.addEventListener('click', (event) => {
        if (event.target.className === 'btn btn--edit') {
          const id = event.target.parentNode.id;
          this._onDisplayInlineBlock();
          handler(id);
        }
      });
    });
  }

  bindToDisplayNone() {
    this.buttonBack.addEventListener('click', () => {
      this._onDisplayNone();
    });
  }

  bindDeleteProduct(handler) {
    this.buttonDelete.addEventListener('click', () => {
      handler();
      this._onDisplayNone();
    });
  }
  bindUpdateProduct(handler) {
    this.buttonUpdate.addEventListener('click', () => {
      if (this._getValues) {
        handler(this._getValues);
        this._resetInput();
        this._onDisplayNone();
      }
    });
  }
  bindDeleteAllProduct(handler) {
    this.buttonDeleteAll.addEventListener('click', () => {
      handler();
    });
  }
}
