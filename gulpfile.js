"use strict";

// import gulp
import gulp from "gulp";
// Newer
import newer from 'gulp-newer';
// Delete files
import del from 'gulp-clean';
import { pipeline } from 'stream/promises';
import through2 from 'through2';
// Cached files
import cached from 'gulp-cached';
// Dependents
import dependents from 'gulp-dependents';
// Zip files
import zip from "gulp-zip";
// Compress Images
import imagemin, {mozjpeg, optipng} from "gulp-imagemin";
// Browser sync
import BrowserSync from "browser-sync";
// Notifications
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import logSymbols from "log-symbols";
// Sass
import dartSass from "sass";
import gulpSass from "gulp-sass";
// Minify and autoprefixer css
import minifyCSS from "gulp-clean-css";
import gulpAutoprefixer from "gulp-autoprefixer";
// Rename files
import gulpRename from "gulp-rename";
// RTL css 
import gulpRtlcss from "gulp-rtlcss";
// JS Plugins
import babel from "gulp-babel";
// Minify HTML
import GulpUglify from "gulp-uglify";
// Panini
import panini from "panini";
// Config
import options from "./config.js";

// Zip file name
const zipFileName = "medit-frontend.zip";

const { src, dest, watch, series, parallel } = gulp;
const browserSync = BrowserSync.create();
const sass = gulpSass(dartSass);

// Load Previews on Browser on dev
function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: options.paths.dist.base,
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    port: options.config.port || 5000,
    open: true, 
    notify: false,
    reloadOnRestart: true, 
  });
  done();
}

// compile base css code
function style() {
  console.log("\n\t" + logSymbols.info, "Compiling Base SCSS..\n");
  return src([ `${options.paths.src.scss}/theme/base.scss` ])
  .pipe(plumber({
    errorHandler: notify.onError({
      title: "SCSS Error",
      message: "Error: <%= error.message %>",
      sound: false
    })
  }))
  .pipe(cached('scss'))
  .pipe(dependents())
  .pipe(sass.sync({
    outputStyle: 'expanded',
    precision: 6,
    includePaths: ['node_modules'],
  }).on('error', sass.logError))
  .pipe(gulpAutoprefixer({
    cascade: false
  }))
  .pipe(dest(options.paths.dist.css))
  .pipe(minifyCSS({
    level: { 
      1: { specialComments: 0 },
      2: { mergeMedia: true }
    }
  }))
  .pipe(gulpRename({ suffix: '-min' }))
  .pipe(dest(options.paths.dist.css))
  .pipe(browserSync.stream({ match: '**/*.css' }));
}

// compile base css code for rtl
function styleRTL() {
  console.log("\n\t" + logSymbols.info, "Compiling Base SCSS..\n");
  return src([ `${options.paths.src.scss}/theme/base.scss` ])
  .pipe(plumber({
    errorHandler: notify.onError({
      title: "SCSS Error",
      message: "Error: <%= error.message %>",
      sound: false
    })
  }))
  .pipe(sass.sync({
    outputStyle: 'expanded',
    precision: 6,
    includePaths: ['node_modules'],
  }).on('error', sass.logError))
  .pipe(gulpAutoprefixer({
    cascade: false
  }))
  .pipe(gulpRtlcss())
  .pipe(gulpRename({ suffix: '-rtl' }))
  .pipe(dest(options.paths.dist.css))
  .pipe(minifyCSS({
    level: { 
      1: { specialComments: 0 },
      2: { mergeMedia: true }
    }
  }))
  .pipe(gulpRename({ suffix: '-min' }))
  .pipe(dest(options.paths.dist.css))
}

// =========== JS Tasks =========== //

// compile js code
function javascript() {
  console.log("\n\t" + logSymbols.info, "Compiling Global JS..\n");
  return src([ `${options.paths.src.js}/bundle.js` ])
  .pipe(plumber( {errorHandler: notify.onError("Error:<%= error.message %>")} ))
  .pipe(dest(options.paths.dist.js))
  .pipe(babel())
  .pipe(gulpRename( { suffix: '-production' }))
  .pipe(dest(options.paths.dist.js))
  .pipe(GulpUglify())
  .pipe(gulpRename( { suffix: '-min' }))
  .pipe(dest(options.paths.dist.js))
  .pipe(browserSync.stream());
}

// =========== Panini HTML Task =========== //

// Compile HTML partials with Panini
function html() {
  console.log("\n\t" + logSymbols.info, "Compiling HTML..\n");
  panini.refresh();
  return src( `${options.paths.src.base}/pages/**/*.html` )
  .pipe(panini({
    root: `${options.paths.src.base}/pages/`,
    layouts: `${options.paths.src.base}/layouts/`,
    partials: `${options.paths.src.base}/partials/`,
    helpers: `${options.paths.src.base}/helpers/`,
    data: `${options.paths.src.base}/data/`
  }))
  .pipe(dest(options.paths.dist.base))
  .pipe(browserSync.reload({ stream: true }));
}

// =========== Compress Images Tasks =========== //
async function compressImages() {
  try {
    console.log("\n\t" + logSymbols.info, "Compressing Images..\n");

    const processedFiles = new Set();

    await pipeline(
      src(`${options.paths.src.img}/*`, { encoding: false }),
      newer(options.paths.dist.img),
      through2.obj((file, enc, cb) => {
        processedFiles.add(file.relative);
        cb(null, file);
      }),
      imagemin([
        mozjpeg({
          quality: 75,
          progressive: true,
          optimize: true
        }),
        optipng({
          optimizationLevel: 5,
          interlaced: true
        })
      ]),
      dest(`${options.paths.dist.img}`)
    );

    if (processedFiles.size > 0) {
      const filesToDelete = Array.from(processedFiles).map(file => 
        `${options.paths.src.img}/${file}`
      );
      return src(filesToDelete, { read: false })
        .pipe(del({ force: true }));
    }
    
    return Promise.resolve();
  } catch (error) {
    console.error("\n\t" + logSymbols.error, "Image compression failed:", error);
    throw error;
  }
}

// =========== Zip files Tasks =========== //
function zipFiles() {
  console.log("\n\t" + logSymbols.info, "Zipping Files..\n");
  return src([ 
    `${options.paths.src}/**/*`,
    `${options.paths.dist}/**/*`,
    `${options.paths.root}/.babelrc`,
    `${options.paths.root}/package.json`,
    `${options.paths.root}/yarn.lock`,
    `${options.paths.root}/config.js`,
    `${options.paths.root}/gulpfile.js`,
  ])
  .pipe(zip(zipFileName))
  .pipe(dest(options.paths.root))
}

// =========== Reset Tasks =========== //

// Reset Panini Cache
function resetPages(done) {
  console.log("\n\t" + logSymbols.info, "Clearing Panini Cache..\n");
  panini.refresh();
  done();
}

// Triggers Browser reload
function previewReload(done) {
  console.log("\n\t" + logSymbols.info, "Reloading Browser Preview.\n");
  browserSync.reload();
  done();
}

// =========== Export Tasks =========== //

// Watsh tasks
function watchFiles() {
  // Base SCSS watcher
  const scssWatcher = watch(
    [`${options.paths.src.scss}/theme/**/*.scss`, `${options.paths.src.scss}/utils/*.scss`],
    { ignoreInitial: false }
  );
  
  scssWatcher.on('change', function(path) {
    console.log("\n\t" + logSymbols.info, `File ${path} changed`);
    delete cached.caches['scss'];
    series(style, previewReload)();
  });

  scssWatcher.on('add', function(path) {
    console.log("\n\t" + logSymbols.info, `File ${path} added`);
    delete cached.caches['scss'];
    series(style, previewReload)();
  });

  scssWatcher.on('unlink', function(path) {
    console.log("\n\t" + logSymbols.info, `File ${path} removed`);
    delete cached.caches['scss'];
    series(style, previewReload)();
  });

  watch( `${options.paths.src.js}/bundle.js`, series( javascript, previewReload ) );
  watch( `${options.paths.src.img}/*`, series( compressImages ) );
  watch(
    [
      `${options.paths.src.base}/pages/*.html`,
      `${options.paths.src.base}/layouts/*.html`,
      `${options.paths.src.base}/partials/**/*.html`
    ],
    { events: ['change', 'add', 'unlink'] },
    series(resetPages, html, previewReload)
  );
  console.log("\n\t" + logSymbols.info, "Watching for Changes..\n");
}

// Build development all tasks
const buildTasks = [
  resetPages,
  parallel(
    style,
    javascript,
    html,
    compressImages
  )
];

// Build production rtl tasks
const productionTask = [
  ...buildTasks,
  parallel( styleRTL )
];

// Build production zip tasks
const productionZipTask = [
  ...buildTasks,
  parallel( zipFiles )
];

// Gulp default tasks
export default (done) => {
  series(
    resetPages,
    parallel( ...buildTasks ),
    parallel( livePreview, watchFiles )
  )();
  done();
}

// Gulp production tasks
export const build = (done) => {
  series( ...productionTask, productionZipTask, done )();
}
