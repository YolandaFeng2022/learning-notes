## 6. Web Fonts

### Web fonts can be major performance hogs

- Require their own @font-face CSS rulesets
- Require their own font files for each set of glphs
- Weights and styles may require their own font files
- Often hosted on third-party services

### Optimizing third-party web font delivery

- Pick only the fonts and weights you are going to use
- Combine request for multiple font families into one
- User resource hints to `dns-prefetch` API and `preconnect` to the font file service
- Use `&display=swap` if possible
- Use `&text=[yourText]` if only small character set is used
  ![font preload preconnect swap](../assets/Font%20preload%20preconnect%20swap.PNG)

### Optimizing self-hosted web font delivery

- preload

```
  	<link
		rel="preload"
		href="../font-path/font-family.ttf"
		as="font"
  		type="font/woff2"
	/>
```

### Variable fonts to the rescue?

- Limit the number of font families and weights

### Web fonts on a performance budge

- Consider using a system font instead of a web font
- Limit the number of font families to use
- Limit the number of weights and styles you use unless you're using a variable font
- Pick the correct character set
- Consider deferring font loading by using a matching system font first
- Cache font styles and font files for the future use

***
## <<< [Improve Web Performance](../README.md)
*** 