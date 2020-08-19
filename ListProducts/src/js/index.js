import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import printMe from './print';
import '../css/main.scss';
function component() {
  const element = document.createElement('div');
  const button = document.createElement('button');
  button.innerHTML = 'Click Me';
  button.onclick = printMe;
  element.innerHTML = 'Click this button -> ';
  element.appendChild(button);
  element.appendChild(button2);

  return element;
}

document.body.appendChild(component());
