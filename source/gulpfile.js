// define gulp plugins
import pkg from 'gulp';
const { series, parallel, watch } = pkg;
import browserSyncImport from 'browser-sync';
import cached from 'gulp-cached';
import { deleteAsync } from 'del';

// import gulp tasks and source files
import { scssDev, scssBuild } from './gulp-tasks/scss.js';
import { scriptDev, scriptBuild } from './gulp-tasks/scripts.js';
import { injectString } from './gulp-tasks/inject-string.js';
import spriteBuilder from './gulp-tasks/sprites.js';
import { imagesCopy } from './gulp-tasks/image.js';
import html from './gulp-tasks/html.js';
import fonts from './gulp-tasks/fonts.js';
import { favicon } from './gulp-tasks/favicon.js';
import { publicSource, devSource, watchSource } from './gulp-tasks/path.js';

// save reference to created browser-sync instance
const browserSync = browserSyncImport.create();

const reload = (done) => {
  browserSync.reload();
  done();
};

// static server + browserSync watching for all files
export const serve = () => {
  browserSync.init({
    port: 9005,
    notify: false,
    server: {
      baseDir: devSource.browserSyncBaseDir,
      index: devSource.browserSyncIndex,
    },
  });
};

// compile sass into CSS dev
export const stylesDev = (cb) =>
  scssDev(devSource.scssPages, publicSource.css, browserSync, cb);

// compile sass into CSS prod
export const stylesBuild = (cb) =>
  scssBuild(devSource.scssPages, publicSource.pathOutputCss, cb);

// compile js dev
export const jsDev = (cb) => scriptDev(devSource.jsPages, publicSource.js, cb);

// compile js prod
export const jsBuild = (cb) =>
  scriptBuild(devSource.jsPages, publicSource.js, cb);

// inject updated file name to header
export const injectCss = (cb) =>
  injectString(
    devSource.baseInputCss,
    publicSource.pathOutputCss,
    publicSource.cssBuild,
    cb,
  );

// inject updated file name to footer
export const injectJs = (cb) =>
  injectString(
    devSource.baseInputJs,
    publicSource.pathOutputJs,
    publicSource.jsBuild,
    cb,
  );

// clean generated css, js, html
export const clean = () =>
  deleteAsync(
    [
      publicSource.htmlBuild,
      publicSource.pathOutputCss,
      publicSource.pathOutputJs,
    ],
    {
      force: true,
    },
  );

// clean generated images
export const cleanImages = () =>
  deleteAsync(publicSource.images, {
    force: true,
  });

export const assembleHtml = (cb) =>
  html(devSource.htmlSource, devSource.htmlBase, publicSource.htmlBuild, cb);

// create svg sprites
export const createSvgSprite = (cb) =>
  spriteBuilder(devSource.svgSprite, publicSource.svgSprite, 'symbols.svg', cb);

// image processing
export const imageProcessing = (cb) =>
  imagesCopy(
    [devSource.images, devSource.excludeSprites, devSource.excludeFavicon],
    publicSource.images,
    cb,
  );

// image minification
/*export const imageMinification = (cb) =>
  imagesMin(
    [devSource.images, devSource.excludeSprites, devSource.excludeFavicon],
    publicSource.imagesCompiled,
    cb,
  );*/

// copy fonts
export const copyFonts = (cb) => fonts(devSource.fonts, publicSource.fonts, cb);

// create favicon
export const faviconGenerator = (cb) =>
  favicon(devSource.favicon, publicSource.faviconBuild, cb);

// watch any changes in jpg, png, css, js, svg files
export const watcher = () => {
  watch(watchSource.scss, series(stylesDev, injectCss)).on(
    'change',
    (event) => {
      console.log(`event happened: ${JSON.stringify(event)}`);
      if (event.type === 'deleted') {
        delete cached.caches[stylesDev][event.path];
      }
    },
  );
  watch(watchSource.js, series(jsDev, injectJs, reload));
  watch(watchSource.html, series(assembleHtml, reload));
  watch(watchSource.svgSprite, series(createSvgSprite, reload));
  watch(
    [
      watchSource.images,
      watchSource.excludeSprites,
      watchSource.excludeFavicon,
    ],
    series(cleanImages, createSvgSprite, imageProcessing, reload),
  );
};

// build task
export const build = series(
  clean,
  parallel(stylesBuild, jsBuild),
  injectJs,
  imageProcessing,
  createSvgSprite,
  copyFonts,
  faviconGenerator,
  assembleHtml,
);

// default task
export default series(
  clean,
  parallel(stylesDev, jsDev),
  injectCss,
  injectJs,
  imageProcessing,
  createSvgSprite,
  copyFonts,
  faviconGenerator,
  assembleHtml,
  parallel(watcher, serve),
);
