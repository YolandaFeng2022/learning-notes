## 3. Create a Performance Budget

### What is a performance budge?

- Page Weight

  The total size of data downloaded by the browser; primary measurement of performance.

- Performance Budget

  A budget to define limits for total page weight and for each metric that may impact performance

- Performance budgets turn a real-life user experience into a measurable metric.
- Suggest tools for manager performance budget

  - [Webpack>Configuration>Performance](https://webpack.js.org/configuration/performance/)

  - [Use Lighthouse for performance budgets](https://web.dev/use-lighthouse-for-performance-budgets/)

### Creating a realistic performance budget

- Best-Practice Perf Budget Metrics

  - Speed index under 3 seconds
  - Time to Interactive (TTI) under 5 seconds
  - Largest Contentful Paint (LCP) under 1 second
  - Max Potential First Input delay under 130ms
  - Max 170 Gzip JS bundle
  - Total bundle size of 250kb
  - All this on a low-powered "feature" phone on 3G

- How to Build a Perf Budget

  - Build separate performance budgets for mobile devices on slow networks and desktop/laptop devices on fast networks
  - Do a performance audit
  - Set reasonable performance goals based on audit
  - Test production version against performance budget --- use the tools
  - Do a competitor performance audit: make your performance goal to be better than you compititors
  - Performance budgets are unique to each project, come out your best one。
  - Performance budgets can and will change over time --- your project changes over time
  - Test all work against the performance budget

### Common performance culprits and hogs

- The DNS lookup time
- Connect time: TCP handshake
- Wait time for the first byte from server: server speed
- Whether is using HTTP/2
- Images, JavaScript, Css, Fonts

***
## <<< [Improve Web Performance](../README.md)
*** 
