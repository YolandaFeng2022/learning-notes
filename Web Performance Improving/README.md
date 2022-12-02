# Web Performance Improving

I'll continue on adding more content and notes on this Chapter.

## General Conception
- [1. Web Performance Introduction](./docs/1_%20Web%20Performance%20Introduction.md)
- [2. Web Performance Basics](./docs/2_%20Web%20Performance%20Basics.md)
- [3. Create a Performance Budget](./docs/3_%20Create%20a%20Performance%20Budget.md)
- [4. Optimize Images](./docs/4_%20Optimize%20Images.md)
- [5. Markup and Content](./docs/5_%20Markup%20and%20Content.md)
- [6. Web Fonts](./docs/6_%20Web%20Fonts.md)
- [7. Optimize Delivery](./docs/7_%20Optimize%20Delivery.md)
- [8. Performance Checklist](./docs/8_%20Performance%20Checklist.md)

## Why is optimal loading difficult to achieve? - problems
- Sub-Optimal sequencing: The relationship (order, timing) of each critical resources occur
- Network/CUP Utilization: Ensure full CPU and network utilization
- Third-Party products: 
    - 3P libraries often add common features and functionalities, including ads/analytics/social widget/live chart and other embeds which power website
    - 3P products often have heavy data need to be loaded which block critical resources
    - 3P needs developers more efforts on learning/bugfix/maintain
- Platform Quirks: Compatibility between different browsers may destroy your order of your load sequence(like different browser load oder for `preload` differently)
- HTTP2 Prioritization: 
    - The protocol doesn't provide the option for prioritizing resources loading
    - The server side may prioritize resources may destroy FE load sequence
- Resource Level Optimization
    - critical CSS be inlined
    - Sized sets of images
    - JS resources
        - code split chunks
        - Tree Shaking
        - delivered incrementally
        - lazy loading, suspense, concurrent, data fetching
        - caching among common dependencies
        - deffer, async, sync, delay, dynamic hydration


## Practice Loading Sequence
1. CSS and Fonts are loaded with the highest priority
2. Scripts get different prioritize based on where they are in the document and whether they are synced/deferred or blocked.   
Blocking scripts requests before the first image (ABT) are given higher priority.
3. Images that are visible and in the viewport have the higher priority than those that are not in the viewport.

## How to import more script
1. Static import
2. Dynamic import
3. Import on visibility
4. Import on Interaction
5. Fake loading 3P UI with a facade(loading placeholder)
6. Authentication: load/hydrate until user login or authenticated
7. widget?
8. Promise-Based script loader


#### Reference
- [Linkedin Learning](https://www.linkedin.com/learning/developing-for-web-performance/what-is-performance-and-why-is-it-so-important?autoplay=true&resume=false&u=2036388)
- [JavaScript Design Patterns](https://www.patterns.dev/)
