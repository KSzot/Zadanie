export default class View {
  constructor() {
    this.dropdownWrapper = document.querySelector('.custom-select-wrapper');
  }

  get _todoText() {
    return this.input.value;
  }

  _resetInput() {
    this.input.value = '';
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
}
