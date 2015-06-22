var gulp = require("gulp"),
	minifyCSS = require("gulp-minify-css"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat")

;

gulp.task("css", function() {
	return gulp.src("src/css/**/*.css")
		.pipe(concat("main.min.css"))
		.pipe(minifyCSS())
		.pipe(gulp.dest("build/css"))
});

gulp.task("js", function() {
	return gulp.src("src/js/**/*.js")
		.pipe(concat("main.js"))
		.pipe(uglify())
		.pipe(gulp.dest("build/js"))
});

gulp.task("default", function()	{
	gulp.watch("src/css/**/*.css", ["css"]);
	gulp.watch("src/js/**/*.js", ["js"]);
});