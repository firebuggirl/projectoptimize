"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    image = require('gulp-image'),
    imageop = require('gulp-image-optimization'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    browserSync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css'),
    inlineImg = require('gulp-inline-image-html');
  //  h5bp = require('h5bp');//secures backup and hidden files?..trying to cache images via .htaccess




gulp.task("concatScripts", function() {
   return gulp.src([
        'src/js/jquery.js',
        'src/js/scripts.js'
      
        ])
      .pipe(maps.init())
      .pipe(concat('src/app.js'))
      .pipe(maps.write('./'))
    // .pipe(gulp.dest('src/js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
	gulp.src("src/js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('dist/js'));
});


gulp.task('watchSass', function() {
  gulp.watch('src/scss/**/*.scss');

})

gulp.task('compileSass', ['watchSass'], function() {
  //gulp.src("src/scss/main.scss")
  gulp.src("src/scss/**/*.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('src/css'));
})

gulp.task('autoprefixer', ['compileSass'], function () {//auto add vendor prefixes
    return gulp.src('src/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
});



//gulp.task('minifyCSS', ['autoprefixer', 'watchSass'], function() {
  gulp.task('minifyCSS', ['compileSass', 'autoprefixer', 'watchSass'], function() {
    return gulp.src('src/css/main.css')
        //.pipe(sourcemaps.init())
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
      //  .pipe(sourcemaps.write())
        //.pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/css'));
    })

    gulp.task("watch", function() {
        gulp.watch('src/js/*.js', ['minifyScripts']);
        gulp.watch('src/css/main.css', ['minifyCSS']);
        gulp.watch('src/index.html', ['minifyHTML']);
    });


    gulp.task("connect", function() {
        connect.server({
            root: 'dist',
            livereload: true
        });
    });


gulp.task('imagesOpt', function(cb) {
    gulp.src(['src/img/**/*.png','src/img/**/*.jpg','src/img/**/*.svgo']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('dist/img')).on('end', cb).on('error', cb);
});


gulp.task('images', function() {//run gulp images
  return gulp.src('src/img/**/*')
    .pipe(imagemin({
        // optimizationLevel: 3,
        // progressive: true,
        // interlaced: true
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true
       }))
    .pipe(gulp.dest('dist/img'))
  //  .pipe(notify({ message: 'Images task complete' }));
});


gulp.task("inlineImg", function() {
    return gulp.src("src/index.html")
        .pipe(inlineImg('src'))
        .pipe(gulp.dest('dist'))
});

gulp.task("minifyHTML", ['inlineImg'], function() {
    gulp.src("src/index.html")
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist'));
        //.pipe(connect.reload());
});


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});

// or...

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "yourlocal.dev"
//     });
// });


gulp.task("build", ['minifyScripts', 'compileSass', 'minifyCSS', 'minifyHTML'], function() {
  return gulp.src(["src/css/main.css", "src/js/app.js", 'src/index.html',
                   "src/img/**/*"], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task("default", ["build", "connect", "watch"]);
