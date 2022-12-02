## 4. Optimize Images

### Image matters

- Shallow depth of field = Better performances
- Images are the leading cause of the slow web

### The image scaling hack

- 1. 85% downscale the image to reduce the complexity
- 2. 115% upscale the image after step1
- 3. compress/squoosh image

### Image format options

- Formats introduce

  - GIF

    - Meant for simple lo-fi graphics
    - Lossy image format
    - 256 colors --- narrow color range
    - Can be animated(don't use them, use video)
    - SVG/video is always a better option

  - WebP

    - Meant for web-based photos
    - Up to 34% smaller than JPGs, 26% smaller than PNGs
    - Not supported in older browsers(fallback required)

  - PNG

    - Meant for graphics
    - Lossless image format
    - Optional transparent alpha layer
    - Use for computer-generated graphics and transparency

  - SVG

    - Meant for advanced scalable graphics
    - Written in markup, can be included in HTML, is style with CSS
    - Very small when optimized
    - Use for vector-based computer generated graphics an icons

  - JPG/JPEG

    - Meant for photos
    - Lossy image format with adjustable compression
    - High compression = large artifacts
    - Use for photos when WebP is not an option

- What format should I use?

  - For photos, use WebP(with JPG fallback) or JPG
  - For complex computer graphics, use PNG or JPG(whichever is smaller)
  - For graphics with transparency, use PNG or WebP
  - For scalable computer graphics, icons, and graphics, use SVG
  - Avoid animation GIFs if all possible: use video instead

### Manual image optimization Basics

- Determine maximum displayed size for all images
- 1920px max width for full bleed images
- suggest use 2000px all the time as the maximum image size
- Scale images to maximum displayed size
- Experiment with compression in WebP and JPG, lower is better
- Only enable transparency in WebP/PNG when necessary
- Simplify SVGs by removing unnecessary points and lines
- Compare file size for JPG, WebP, and PNG for computer graphics

### Automated image optimization

- [imagemin - npm](https://www.npmjs.com/package/imagemin)
- [squoosh/cli - npm](https://www.npmjs.com/package/@squoosh/cli)
- [sharp - npm](https://www.npmjs.com/package/sharp)

### Responsive images

- Responsive Images Markup

  ```
  <img  srcset="image-small.jpg 320w,
  				image-medium.jpg 600w,
  				image-large.jpg 1200w,
  				image-full.jpg 1290w"
  		sizes="(min-width: 1200px) 1200px, 100vw"
  		src="image.jpg"
  		alt="A very nice image."
  		loading="lazy||eager">
  ```

- Targeting Image Sizes

  - Always provide an image for the smallest screen at 320px
  - Make your widest possible image 2000px(1920px)
  - Control the displayed width for individual images using sized attribute
  - Find natural breakpoints and make image sizes to match
  - Try to limit yourself to 4-5 image sizes

### Lay-loading images

Load images only when you needed

- Load an asset(image, video, iframe, etc.) only when a specific requirement is met
- Example: Image is close to viewport, User clicks button, Specified event is triggered due to user action
- Lazy load all media assets below the fold
- lazysizes - github

***
## <<< [Improve Web Performance](../README.md)
*** 
