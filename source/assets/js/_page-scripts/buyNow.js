/*---=== import modules ===---*/

import { qS, qSA } from '../functions/selectElement.js';
import select from '../pages/buyNow/select.js';
import currency from '../pages/buyNow/currency.js';
import rangeslider from '../pages/buyNow/rangeslider.js';

/*---=== /import modules ===---*/

/*---=== declare variables ===---*/

const selectElement = qS('.js-select');
const buttons = qSA('.js-currency-button');
const price = qS('.js-price');
const card = qS('.js-card-20');
const cardMore20 = qS('.js-card-more20');
const slider = qS('.js-range-slider');
const finalText = qS('.js-final-text');
const pipsMiddle = qS('.js-pips-middle');
// const sliderRangeValue = qS('.js-range-slider-value');

/*---=== /declare variables ===---*/

/*---=== run modules ===---*/

document.addEventListener('DOMContentLoaded', () => {
  // init select
  if (selectElement !== null) {
    select(selectElement, card, cardMore20);
  }

  // init currency module
  if (buttons.length > 0) {
    currency(buttons, price);
  }

  // init range slider
  if (slider !== null) {
    rangeslider(slider, card, cardMore20, finalText, pipsMiddle);
  }
});

/*---=== /run modules ===---*/
