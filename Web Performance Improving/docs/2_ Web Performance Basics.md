## 2. Web Performance Basics

### How browsers render content

- 1. Browser sends request for a website
     The request go to ISP(Internet Service Provider)
- 2. DNS lookup; ISP get the website address from DNS
- 3. [TCP handshake](https://www.guru99.com/tcp-3-way-handshake.html)
- 4. Server send the initial page to client
- 5. Client read and breakdown then render the received page

  - DOM tree
  - CSSOM tree
  - Render blocking?

### HTTP/2 and multiplexing

![HTTP versions compare](../assets/HTTP1%20vs%20HTTP2%20loading%20difference.PNG)

- HTTP/1.1: Synchronous loading

  Loading the content one by one  
  HTML -- cause "Head of Line" blocking  
  CSS  
  CSS  
  JS  
  JPG  
  SVG  
  PNG

- HTTP/2: Multiplexing

  The browser can download many separate files at same time overall one connection, each download is independent of the others.

- Use HTTP/2 Requirements

  - Server must support HTTP/2
  - Browser must support HTTP/2
  - The connection must be encrypted over HTTPS
  - If conditions are not met, connection falls back to HTTP/1.1

### Bottlenecks

- Server/hosting

  - bottleness

    - Processor speed
    - Available RAM
    - Storage Type
    - Available bandwidth
    - Shared resources

  - optimizations

    - Get sufficiently powerful hosting
    - Explore dynamic cloud options
    - Optimize your files for the server
    - Add a CDN to your service

- Connection

  - issues

    - DNS lookup
    - TCP handshake

  - optimizations

    - Preconnect to servers
    - preload content
    - Consider server push
    - Precache select assets

- Files

  - issues

    - Large JS/CSS bundles
    - Large images files
    - Large font files

  - optimizations

    - Modularize JS and CSS
    - Take advantage of HTTP/2 multiplexing
    - async/defer JS
    - Defer non-critical CSS
    - Lazy-load images

### Caching

- Server-Side Caching

  - Vital for server-side rendered content from a content management system(CMS) like WordPress, Drupal, etc.
  - Caching dynamic assets means the server doesn't have to generate the same assets for every request
  - Beware of dynamic asset updates

- CDN Caching

  - CDNs are effectively external caching for assets
  - Serve cached version of the site from server closest to visitor
  - Edge computing moves dynamic asset building to the CDN for quicker and closer service

- Browser Caching

  - Browser cache files automatically
  - You can control browser caching using HTTP headers
  - Caching strategies are now often controlled by the CDN
  - Split JS/CSS bundles into multiple files means updates don't require re-downloading and re-caching large files

### The PRPL pattern

- Push (preload) the most important resources
- Render the initial route as soon as possible
- Pre-cache remaining assets
- Lazy load other routes and non-critical assets

***
## <<< [Improve Web Performance](../README.md)
*** 
