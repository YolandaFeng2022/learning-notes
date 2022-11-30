# 1. Web Performance Introduction

## What is web performance and optimization?

- Important notes about performance parameters
  - **TTFB**: Time to First Byte - the time between clicking a link and the first bit of content coming in.
  - **FP**: First Paint - First time any content becomes visible to te user or the time when the first few pixels are painted on the screen.
  - **FCP**: First Contentful Paint - Time when all the requested content becomes visible
  - **LCP**: Largest Contentful Paint - Time when the main page content becomes visible. This refers to the largest image or text block visible within the viwport.
  - **TTI**: Time to Interactive - Time when the page becomes interactive.
  - **TBT**: Total Blocking Time - the Total amount of time between FCP and TTI.

- Practical Web Performance Strategy
  - Do what you can, and realize not every performance optimization will fit your situation and needs.

- Web Performance focus Areas

  - Reducing overall loading time

    compressing and minify and uglify all files  
    reduce file size and http requests  
    deploying and caching technics  
    only serve uses the part what they actually needed

  - Making the site usable as soon as possible

    load critical content to to give the user initial  
    functionalities and features  
    lazy-load the content that not critical but user may interactive with  
    preload the features that user may interact with next

  - Smoothness and interactivity
  - Performance measurements

- What We Need to Achieve

  - Websites and applications need to be fast and efficient for ALL users no matter what combination of these conditions they are working under.

- Why Performance Matters

  - Websites and applications are becoming more complex
  - Increased complexity means increased file sizes
  - User expectation for fast web services increasing
  - Extreme disparity in internet access and service quality
  - Large variance in devices and software used to access the web

## How do we measure performance?

- Browser tools

  - Lighthouse(Chrome)

    F12 > Lighthouse  
    Set matters settings  
    Analyze page load  
    Go through analyze report and suggestions

  - Network Monitor

    F12 > Network  
    Disable cache  
    Reload the page  
    Analyze requests and Waterfall

  - Performance Monitor

    F12 > Performance  
    Clear  
    Start profiling and reload the page  
    Analyze the time allocation of whole page loading

  - Coverage Monitor

    F12 > Customize and control DevTools  
    Coverage > More tools > Coverage  
    Start instrumenting coverage and reload page  
    Wait the page loaded  
    Interact/browse the page  
    Analyze the JS and CSS files coverage during the browse time

- Hosted third-party tools

  - [PageSpeed Insights(Google)](https://developers.google.com/speed/pagespeed/insights/)

  - [WebPage Test](http://weboagetest.org/)

  - [GTMetrics(actually Lighthouse)](http://weboagetest.org/)

- Standard Performance Measurements

  - First Paint
  - Largest Contentful Paint (LCP)
  - First Meaningful Paint (FMP)
  - Time to Interactive (TTI)

## Why does performance matter?

- Performance is a key metric for success
- Search Engine ranks sites based on performance
- Performance is about the end-user, the people

  Provide people with the most optimized performance possible so they get the information or interaction they are looking for in the least amount of time, with the least impact on their internet service plan.

- The price of bad performance is primarily paid by our visitors.
- Good Performance Is...

  - Better for your visitors
  - Better for your Search Engine rankings
  - Better for you (less hosting and traffic expenses)
  - Better for the environment
