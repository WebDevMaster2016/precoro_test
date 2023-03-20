import pkg from 'gulp';
const { src, dest } = pkg;
import pump from 'pump';
import plumber from 'gulp-plumber';
import fileinclude from 'gulp-file-include';
import notify from 'gulp-notify';

export default function html(inputHtml, basepath, outputHtml, cb) {
  return pump(
    [
      src(inputHtml),
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }),
      fileinclude({
        prefix: '@@',
        basepath: basepath,
        context: {
          minWidthDesktop: '(min-width:1170px)',
          minWidthLaptop: '(min-width:1024px)',
          minWidthTablet: '(min-width:768px)',
          maxWidth: '(max-width:767px)',
          minWidth: '(min-width:768px)',
          image_preload:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGP6zwAAAgcBApocMXEAAAAASUVORK5CYII=',
          sprites_articles__: `/assets/images/sprites/articles/svg/symbols.svg#icon-`,
          sprites_buyNow__: `/assets/images/sprites/buyNow/svg/symbols.svg#icon-`,
          images_buyNow__: 'assets/images/pages/buyNow/',
          fonts_inter__: 'assets/fonts/inter/',
          fonts_literata__: 'assets/fonts/literata/',
        },
      }),
      dest(outputHtml),
    ],
    cb,
  );
}
