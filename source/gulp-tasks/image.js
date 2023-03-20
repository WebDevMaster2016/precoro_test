import pkg from 'gulp';
const { src, dest } = pkg;
import pump from 'pump';
/*import path from 'path';
import squoosh from 'gulp-libsquoosh';*/

export function imagesCopy(inputImages, outputImages, cb) {
  return pump([src(inputImages), dest(outputImages)], cb);
}

// fail to work with node >=18
/*export function imagesMin(inputImages, outputImages, cb) {
  return pump(
    [
      src(inputImages),
      squoosh((src) => {
        const extname = path.extname(src.path);
        let options = {
          encodeOptions: squoosh.DefaultEncodeOptions[extname],
        };

        if (extname === '.jpg') {
          options = {
            encodeOptions: {
              mozjpeg: {},
              webp: {},
            },
          };
        }

        if (extname === '.png') {
          options = {
            encodeOptions: {
              oxipng: {
                level: 6,
              },
              webp: {},
            },
            preprocessOptions: {
              quant: {
                enabled: true,
                numColors: 128,
              },
            },
          };
        }

        return options;
      }),
      dest(outputImages),
    ],
    cb,
  );
}*/
