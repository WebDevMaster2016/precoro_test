import Swiper, { Keyboard, Navigation, Pagination, Grid } from 'swiper';

export default (cardSliderSection, articlesActions, tags, filters, slides) => {
  let initSwiper = () => {
    return new Swiper(cardSliderSection, {
      modules: [Navigation, Pagination, Keyboard, Grid],
      observeParents: true,
      observeSlideChildren: true,
      observer: true,
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 24,
      pagination: {
        el: '.js-card-swiper-pagination',
        type: 'custom',
        renderCustom: (swiper, current, total) => {
          return `${current} of ${total}`;
        },
      },
      keyboard: {
        enabled: true,
      },
      navigation: {
        nextEl: '.js-card-button-next',
        prevEl: '.js-card-button-prev',
      },
      on: {
        observerUpdate(swiper) {
          console.log(swiper);
          console.log('observerUpdate');
          articlesActions.style.display =
            swiper.slidesGrid.length <= 2 ? 'none' : 'flex';
          if (window.innerWidth <= window.front.maxTableWidth) {
            swiper.el.style.height =
              swiper.slidesGrid.length === 1 ? 'initial' : null;
          }
        },
      },
    });
  };

  initSwiper();

  const filterByTag = (tags) => {
    slides.forEach((elem) => {
      let matching = JSON.parse(elem.dataset.params).some(
        (elem) => elem === tags,
      );
      elem.style.display = !matching ? 'none' : 'block';
    });

    initSwiper();
  };

  tags.forEach((elem) =>
    elem.addEventListener('click', () => filterByTag(elem.dataset.tag)),
  );

  filters.forEach((elem) =>
    elem.addEventListener('click', () => filterByTag(elem.dataset.filter)),
  );
};
