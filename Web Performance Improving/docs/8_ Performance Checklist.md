## 8. Performance Checklist

### Client-Side
- reduce HTTP requests
- reduce DNS lookup times
- avoiding resource redirect
- cache Ajax request data
- delay loading
- precache assets
- reduce DOM elements number
- split content into different domains
- avoiding use iframe
- avoiding 404 errors

### Server-Side
- use CDN and CDN caching
- add Expires or Cache-Control Response Header
- use Gzip/Brotli
- config Etag
- speedup buffering
- use GET method for Ajax requests if possible
- avoiding empty URL in `<img src="">`
- server push

### Cookie
- reduce the size of cookie
- remove domain constrain for static resources

### CSS
- put stylesheets in `<head>`
- don't use CSS expressions
- replace `<link>` from `@import`
- don't use filter

### JavaScript
- put js at the bottom of page
- use external JavaScript and CSS
- compress JavaScript and CSS
- tree shaking (use tools or handy)
- move or extract common used JavaScript and CSS
- reduce the time to operate DOM
- handle events efficiently
- split JavaScript in small chunks
- load chunks on demand
- uglify file, remove notations, remove useless blank spaces

### Images
- optimize/compress images
- CSS Sprite
- don't zoom images in html
- dynamic import images according viewport size
- lazy loading images on demand
- pre loading when FPS remain time occur

***
## <<< [Improve Web Performance](../README.md)
*** 