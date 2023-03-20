export default (buttons, price) => {
  const prices = {
    usd: '$35',
    eur: '32€',
    gbp: '29£',
  };

  buttons.forEach((elem, idx, arr) => {
    elem.addEventListener('click', () => {
      arr.forEach((elem) => elem.classList.remove('is-active'));
      elem.classList.add('is-active');
      price.innerText = prices[elem.innerText.toLowerCase()];
    });
  });
};
