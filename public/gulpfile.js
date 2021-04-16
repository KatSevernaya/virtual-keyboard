const {src, dest, series, watch,} = require('gulp')
const del = require('del')
const browserSync = require('browser-sync').create()


function html() {
    return src('./**.html')
       
    
        .pipe(dest('public'))
}



function scripts() {
    return src('./**.js')
        .pipe(dest('public'))
 
}

 function css() {
  return src('./**.css')
         .pipe(dest('public'))
 
 }


 function clear() {
    return del('publicpublic')
}

 
 function serve() {
    browserSync.init({
        server: './public',
        browser: "chrome"
    })
    

   
 
}

exports.clear = clear
exports.build = series(clear, css, html, scripts)
exports.serve = series(css, html, scripts, serve)


