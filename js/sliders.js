const width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

// Steps Slider
function Slider(selector, controls) {
  const sliderWrapper = document.querySelector(selector);
  const btnPrev = document.querySelector(`${controls} .control-btn-prev`);
  const btnNext = document.querySelector(`${controls} .control-btn-next`);
  const slidesLength = sliderWrapper.querySelectorAll('.slide').length;
  const bullets = document.querySelector(`${controls} .control-bullets`);
  const bullet = `
  <button class="bullet" type="button"></button>
  `;

  let indexActiveSlide = 0;

  for (let i = 0; i < 5; i++) {
    bullets.insertAdjacentHTML('afterbegin', bullet);
  }
  bullets.children[indexActiveSlide].classList.add('active');

  btnNext.disabled = false;
  btnPrev.disabled = true;

  btnPrev.addEventListener('click', () => changeSlide('prev'));
  btnNext.addEventListener('click', () => changeSlide('next'));

  const changeSlide = (direction) => {
    const sliderWidth = sliderWrapper.clientWidth;

    if (direction === 'next') {
      btnPrev.disabled = false;
      bullets.children[indexActiveSlide].classList.remove('active');
      indexActiveSlide++;
      bullets.children[indexActiveSlide].classList.add('active');

      if (indexActiveSlide > slidesLength - 2) {
        btnNext.disabled = true;
      }

      sliderWrapper.scrollLeft += sliderWidth;
    }

    if (direction === 'prev') {
      btnNext.disabled = false;
      bullets.children[indexActiveSlide].classList.remove('active');
      indexActiveSlide--;
      bullets.children[indexActiveSlide].classList.add('active');

      if (indexActiveSlide == 0) {
        btnPrev.disabled = true;
      }

      sliderWrapper.scrollLeft -= sliderWidth;
    }
  };
}

// Participants Slider
function SliderBottom(selector, controls, autoslide) {
  const sliderWrapper = document.querySelector(selector);
  const btnPrev = document.querySelector(`${controls} .control-btn-prev`);
  const btnNext = document.querySelector(`${controls} .control-btn-next`);
  const slidesLength = sliderWrapper.querySelectorAll('.slide').length;
  const slideFirstItem = sliderWrapper.querySelectorAll('.carousel__item')[0];
  const pagination = document.querySelector(`${controls} .control-pagination`);

  pagination.querySelector('.pagination-num--all').textContent = slidesLength;

  let indexActiveSlide = 0;
  let numCurrentSlide = pagination.querySelector('.pagination-num--current');

  let initialSlide;

  if (width <= 525) {
    initialSlide = 1;
  } else if (width <= 1024) {
    initialSlide = 2;
  } else if (width > 1024) {
    initialSlide = 3;
  }
  numCurrentSlide.textContent = initialSlide;

  btnPrev.addEventListener('click', () => changeSlide('prev'));
  btnNext.addEventListener('click', () => changeSlide('next'));

  const swipeNext = (initial) => {
    indexActiveSlide++;
    numCurrentSlide.textContent++;
    if (indexActiveSlide > slidesLength - initial) {
      indexActiveSlide = 0;
      numCurrentSlide.textContent = initialSlide;
    }
  };

  const swipePrev = (initial) => {
    indexActiveSlide--;
    numCurrentSlide.textContent--;

    if (indexActiveSlide < 0) {
      indexActiveSlide = slidesLength - initial;
      numCurrentSlide.textContent = slidesLength;
    }
  };

  const changeSlide = (direction) => {
    const slideWidth = slideFirstItem.clientWidth + 20;

    if (direction === 'next') {
      if (width <= 525) {
        swipeNext(1);
      } else if (width <= 1024) {
        swipeNext(2);
      } else if (width > 1024) {
        swipeNext(3);
      }
    }

    if (direction === 'prev') {
      if (width <= 525) {
        swipePrev(1);
      } else if (width <= 1024) {
        swipePrev(2);
      } else if (width > 1024) {
        swipePrev(3);
      }
    }

    sliderWrapper.style.transform = `translateX(-${
      indexActiveSlide * slideWidth
    }px)`;
  };

  if (autoslide) {
    setInterval(() => {
      changeSlide('next');
    }, 4000);
  }
}

window.addEventListener(
  'load',
  Slider('.steps-slider', '.steps-slider__controls'),
  SliderBottom(
    '.carousel-participants__wrapper',
    '.carousel-participants__controls',
    true
  )
);
