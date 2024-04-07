// Бегущая строка
function Marquee(selector, speed) {
  const parentSelector = document.querySelector(selector);
  const clone = parentSelector.innerHTML;
  const firstElement = parentSelector.children[0];
  let i = 0;

  parentSelector.insertAdjacentHTML('beforeend', clone);
  parentSelector.insertAdjacentHTML('beforeend', clone);

  setInterval(function () {
    firstElement.style.marginLeft = `-${i}px`;
    if (i > parentSelector.scrollWidth) {
      i = 0;
    }
    i = i + speed;
  }, 0);
}

window.addEventListener(
  'load',
  Marquee('.line-text__list', 0.2),
  Marquee('.line-text__list-bottom', 0.2)
);
