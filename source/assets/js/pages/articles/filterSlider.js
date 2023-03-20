import Swiper, { Navigation, Controller } from 'swiper';

export default (filterSliderSection) => {
  new Swiper(filterSliderSection, {
    modules: [Navigation],
    slideToClickedSlide: true,
    initialSlide: 0,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.js-filter-button-next',
      prevEl: '.js-filter-button-prev',
    },
    on: {
      reachEnd: function () {
        this.snapGrid = [...this.slidesGrid];
      },
    },
  });
};
