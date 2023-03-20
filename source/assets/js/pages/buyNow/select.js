import Choices from 'choices.js';

export default (select, card, cardMore20) => {
  let choicesArr = [];
  let price = 420;

  for (let item = 1; item <= 20; item++) {
    choicesArr.push({
      value: `${price * item}`,
      label: `<span class="choices__user">${item} user</span><span class="choices__price">$${
        price * item
      }/year</span>`,
    });
  }

  choicesArr.push({
    value: `more`,
    label: `<span class="choices__user choices__user--last">More than 20 users?</span><span class="choices__price choices__price--last">Get a Custom Quote <svg class="icon choices__price-arrow"><use xlink:href="${window.front.spritesBuyNow}arrow-right"></use></svg></span>`,
  });

  new Choices(select, {
    searchEnabled: false,
    choices: choicesArr,
  });

  select.addEventListener('change', (event) => {
    if (event.target.value === 'more') {
      cardMore20.classList.remove('is-inactive');
      card.classList.add('is-inactive');
    } else {
      cardMore20.classList.add('is-inactive');
      card.classList.remove('is-inactive');
    }
  });
};
