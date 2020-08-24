export default class View {
  constructor() {
    this.dropdownSelected = document.querySelector('.selected');
    this.dropdownOptionsContainer = document.querySelector(
      '.options-container',
    );
    this.dropdownOptionsList = document.querySelectorAll('.option');

    this.category = document.querySelector('.selected');
    this.values = document.querySelectorAll('input.form__input');
    this.listProduct = document.querySelectorAll('ul');
    this.totalSum = document.querySelectorAll('.heading-secondary span');
    this.buttonAdd = document.querySelector('.btn--add');
    this.buttonDelete = document.querySelector('.btn--delete');
    this.buttonUpdate = document.querySelector('.btn--update');
    this.buttonBack = document.querySelector('.btn--back');
    this.buttonDeleteAll = document.querySelector('.header__button-box a');
  }

  get _getValues() {
    if (
      this.category.textContent.length === 0 ||
      this.category.textContent.trim() === 'Select Category' ||
      this.values[0].value.length === 0 ||
      this.values[1].value.length === 0
    ) {
      return null;
    } else {
      this.checkBox = document.querySelector(
        'input[type="radio"]:checked.form__radio-input',
      ).parentElement.innerText;
      console.log(this.checkBox);
      const obj = {
        category: this.category.textContent,
        product: this.values[0].value,
        count: this.checkBox.trim() === 'Count' ? this.values[1].value : 0,
        weight: this.checkBox.trim() === 'Weight' ? this.values[1].value : 0,
      };
      console.log(obj);
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

  displayProducts(listProducts) {
    let i = 0;
    let countPieces = 0;
    let countWeight = 0;
    while (i < this.listProduct.length) {
      while (this.listProduct[i].firstChild) {
        this.listProduct[i].removeChild(this.listProduct[i].firstChild);
      }
      i++;
    }
    if (listProducts.length === 0) {
      this.totalSum[0].textContent = `${countPieces} pieces`;
      this.totalSum[1].textContent = `${countWeight} kg`;
    } else {
      listProducts.forEach((element) => {
        const li = this.createElement('li', 'product__item');
        li.id = element.id;
        const product = this.createElement('span', 'product__item--span');
        const price = this.createElement('span', 'product__item--span');
        const button = this.createElement('button', 'btn');
        button.classList.add('btn--edit');
        const svgItem = this.createElement('i', 'fas');
        svgItem.classList.add('fa-pencil-alt', 'fa-lg');
        button.append(svgItem);
        product.textContent = element.product;
        price.textContent =
          element.count === 0 ? element.weight : element.count;
        li.append(product, price, button);
        const category = element.category;
        this.elementUl = document.getElementById(category);
        console.log(this.elementUl);
        countPieces += parseInt(element.count);
        countWeight += parseInt(element.weight);
        this.elementUl.appendChild(li);
      });
      this.totalSum[0].textContent = `${countPieces} pieces`;
      this.totalSum[1].textContent = `${countWeight} kg`;
    }
  }
  bindAddProduct(handler) {
    document.querySelector('.btn--add').addEventListener('click', (event) => {
      if (event.target.className === 'btn btn--add btn--lightblue') {
        if (this._getValues) {
          console.log(this._getValues);
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
        if (
          event.target.parentNode.className === 'btn btn--edit' ||
          event.target.parentNode.className.baseVal ===
            'svg-inline--fa fa-pencil-alt fa-w-16 fa-lg'
        ) {
          const id = event.target.parentNode.parentNode.id;
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

  bindDropdownShow() {
    this.dropdownSelected.addEventListener('click', () => {
      this.dropdownOptionsContainer.classList.toggle('active');
    });
  }

  bindSelectedCategory() {
    this.dropdownOptionsList.forEach((options) => {
      options.addEventListener('click', () => {
        this.dropdownSelected.innerHTML = options.querySelector(
          'label',
        ).innerHTML;
        this.dropdownOptionsContainer.classList.remove('active');
      });
    });
  }
}
