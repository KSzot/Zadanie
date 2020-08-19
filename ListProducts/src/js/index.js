import printMe from './print';
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
