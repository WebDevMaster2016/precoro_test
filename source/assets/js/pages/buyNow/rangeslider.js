import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

export default (slider, card, cardMore20, finalText, pipsMiddle) => {
  let sliderUI = noUiSlider.create(slider, {
    start: [1],
    snap: true,
    connect: [true, false],
    tooltips: wNumb({ decimals: 0 }),
    range: {
      min: 1,
      '2%': 2,
      '5%': 3,
      '8%': 4,
      '11%': 5,
      '14%': 6,
      '17%': 7,
      '20%': 8,
      '22%': 9,
      '25%': 10,
      '28%': 11,
      '31%': 12,
      '34%': 13,
      '37%': 14,
      '40%': 15,
      '42%': 16,
      '44%': 17,
      '46%': 18,
      '48%': 19,
      '50%': 20,
      max: 40,
    },
  });

  slider.noUiSlider.on('update', (values, handle) => {
    document.querySelector('.noUi-tooltip').innerHTML = `${
      values[handle].split('.')[0]
    } user <span class="noUi-tooltip__bottom">$${
      420 * values[handle].split('.')[0]
    }/year</span>`;
    if (values[handle] === '40.00') {
      card.classList.add('is-inactive');
      finalText.classList.add('is-visible');
      cardMore20.classList.remove('is-inactive');
      pipsMiddle.classList.add('is-active');
    } else {
      card.classList.remove('is-inactive');
      finalText.classList.remove('is-visible');
      pipsMiddle.classList.remove('is-active');
      cardMore20.classList.add('is-inactive');
    }
    if (values[handle] === '20.00') {
      pipsMiddle.classList.add('is-active');
    } else {
      pipsMiddle.classList.remove('is-active');
    }
  });
};
