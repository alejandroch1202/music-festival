const { src, dest, watch, parallel } = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

// JavaScript
const terser = require("gulp-terser-js");

// IMG proccessing
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const avif = require("gulp-avif");

function css(done) {
  src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css"));

  done();
}

function toWebp(done) {
  const options = {
    quality: 50,
  };

  src("img/**/*.{jpg, png}").pipe(webp(options)).pipe(dest("build/img"));

  done();
}

function toAvif(done) {
  const options = {
    quality: 50,
  };

  src("img/**/*.{jpg, png}").pipe(avif(options)).pipe(dest("build/img"));

  done();
}

function toMin(done) {
  const options = {
    optimizationLevel: 3,
  };

  src("img/**/*.{jpg, png}")
    .pipe(cache(imagemin(options)))
    .pipe(dest("build/img"));

  done();
}

function javascript(done) {
  src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(dest("build/js"));
  done();
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);

  done();
}

exports.css = css;
exports.js = javascript;
exports.toMin = toMin;
exports.toWebp = toWebp;
exports.toAvif = toAvif;
exports.dev = parallel(toAvif, toMin, toWebp, javascript, dev);
