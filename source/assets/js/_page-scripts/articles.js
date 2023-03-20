/*---=== import modules ===---*/

import { qS, qSA } from '../functions/selectElement.js';
import cardSlider from '../pages/articles/cardSlider.js';
import filterSlider from '../pages/articles/filterSlider.js';

/*---=== /import modules ===---*/

/*---=== declare variables ===---*/

const cardSliderSection = qS('.js-articles-slider');
const articlesActions = qS('.js-articles-actions');
const cards = qSA('.js-articles-slide');
const cardTags = qSA('.js-tag');
const filters = qSA('.js-filter-button');
const filterSliderSection = qS('.js-filter-slider');

/*---=== /declare variables ===---*/

/*---=== run modules ===---*/

document.addEventListener('DOMContentLoaded', () => {
  // init card slider
  if (cardSliderSection !== null) {
    cardSlider(cardSliderSection, articlesActions, cardTags, filters, cards);
  }

  // init filter slider
  if (filterSliderSection !== null) {
    filterSlider(filterSliderSection);
  }
});

/*---=== /run modules ===---*/
