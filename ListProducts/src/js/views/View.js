export default class View {
  constructor() {
    this.dropdownSelected = document.querySelector('.selected');
    this.dropdownOptionsContainer = document.querySelector(
      '.options-container',
    );
    this.dropdownOptionsList = document.querySelectorAll('.option');
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
