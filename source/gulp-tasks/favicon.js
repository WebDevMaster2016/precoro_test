import realFavicon from 'gulp-real-favicon';

let FAVICON_DATA_FILE = 'faviconData.json';

export function favicon(inputFavicon, outputDirectory, done) {
  realFavicon.generateFavicon(
    {
      masterPicture: inputFavicon,
      dest: outputDirectory,
      iconsPath: './',
      design: {
        ios: {
          pictureAspect: 'noChange',
          assets: {
            ios6AndPriorIcons: true,
            ios7AndLaterIcons: true,
            precomposedIcons: false,
            declareOnlyDefaultIcon: false,
          },
        },
        desktopBrowser: {
          design: 'raw',
        },
      },
      settings: {
        compression: 2,
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false,
      },
      markupFile: FAVICON_DATA_FILE,
    },
    function () {
      done();
    },
  );
}
