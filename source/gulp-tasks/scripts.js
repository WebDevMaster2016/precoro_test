import pkg from 'gulp';
const { dest } = pkg;
import browserify from 'browserify';
import babelify from 'babelify';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import buffer from 'vinyl-buffer';
import source from 'vinyl-source-stream';
import hash from 'gulp-hash-filename';
import glob from 'glob';
import es from 'event-stream';

export const scriptDev = (inputJs, outputJs, cb) => {
  glob(inputJs, (err, files) => {
    if (err) {
      cb(err);
    }
    const tasks = files.map((entry) => {
      return browserify({ entries: [entry] })
        .transform(babelify, {
          global: true,
          presets: ['@babel/preset-env'],
        })
        .bundle()
        .pipe(source(entry.slice(entry.lastIndexOf('/') + 1)))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('./'))
        .pipe(dest(outputJs));
    });
    es.merge(tasks).on('end', cb);
  });
};

export const scriptBuild = (inputJs, outputJs, cb) => {
  glob(inputJs, (err, files) => {
    if (err) {
      cb(err);
    }
    const tasks = files.map((entry) => {
      return browserify({ entries: [entry] })
        .transform(babelify, {
          global: true,
          presets: ['@babel/preset-env'],
        })
        .bundle()
        .pipe(source(entry.slice(entry.lastIndexOf('/') + 1)))
        .pipe(buffer())
        .pipe(
          hash({
            format: '{name}_{hash}{ext}',
          }),
        )
        .pipe(uglify())
        .pipe(dest(outputJs));
    });
    es.merge(tasks).on('end', cb);
  });
};
