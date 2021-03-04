const gulp = require("gulp");
const uglify = require("gulp-uglify");
const del = require("del");

gulp.task("rmrf/lib", () => del("lib"));

gulp.task("compile", () =>
  gulp.src("src/**/*.js").pipe(uglify()).pipe(gulp.dest("lib"))
);

gulp.task("default", gulp.series(["rmrf/lib", "compile"]));
