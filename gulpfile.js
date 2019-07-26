var gulp = require("gulp"),
    watch = require("gulp-watch"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssvars = require("postcss-simple-vars"),
    nested = require("postcss-nested"),
    cssImport = require("postcss-import"),
    browserSync = require("browser-sync").create();
    

gulp.task('default', function(){
    console.log("Hey! Gulp installed and running the default task!");
});


gulp.task('html', function(){
    console.log("Some cool stuff related to html is done here");
});

gulp.task('css', function(){
    return gulp.src("./sky/assets/styles/styles.css")
        .pipe(postcss([cssImport,cssvars,nested,autoprefixer]))
        .pipe(gulp.dest("./sky/css"));
});

gulp.task("watch", function(){
    browserSync.init({
        notify: false,
        server:{
            baseDir: "sky"
        }
    });
    watch("./sky/index.html", function(){
        browserSync.reload();
    });
    watch("./sky/assets/styles/**/*.css", gulp.series('css', 'cssInject'));
});

gulp.task("cssInject", function(){
    return gulp.src("./sky/css/styles.css")
    .pipe(browserSync.stream());
})

