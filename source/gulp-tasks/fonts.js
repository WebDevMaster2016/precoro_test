import pkg from 'gulp';
const { src, dest } = pkg;
import pump from 'pump';

export default function fonts(inputFonts, outputFonts, cb) {
  return pump([src(inputFonts), dest(outputFonts)], cb);
}
