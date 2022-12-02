# CSS Tips

## Normalize or Reset CSS?
### CSS mormalize/reset resources:
Go to [Test Page - index.html](./test-page/index.html) and try to visible one of the css then open index.html in browser to see the differences with each other, then select one apply to your project.
- [normalize.css](./test-page/styles/normalize.css)
- [remedy.css](./test-page/styles/remedy.css)
- [reset.css](./test-page/styles/reset.css)

![Test Page - index.html](./assets/test%20page.png)
### Classic reset articles resolution
- [Meyer Web for CSS details](https://meyerweb.com/)
- [Normalize.css](https://necolas.github.io/normalize.css/)
- [CSS Remedy](https://github.com/jensimmons/cssremedy)

## Use Tools to format and standardize your css
- [stylelint](https://stylelint.io/)
- [prettier](https://prettier.io/)
- [prettier-vscode](https://github.com/prettier/prettier-vscode)

## About Container
- The `vw` unit is a bit of blessing
- Consistent sizing with `box-sizing: border-box`
- [CSS Logical Box Module](https://elad.medium.com/new-css-logical-properties-bc6945311ce7) properties instead of position
![CSS Logical Box](./assets/CSS%20Logical%20Box.png)
- Considering [writing-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode)
- Align item in center at horizontal and/or vertical
    ```SCSS
    // Resolution 1:
    .container {
        display: flex;
        justify-content: center; // horizontal centered
        align-items: center; // vertical centered
    }
    // Resolution 2:
    .container {
        display: grid;
        justify-content: center; // horizontal centered
        align-items: center; // vertical centered
    }
    // Resolution 3:
    .container {
        display: grid;
        
        .child {
            justify-self: center; // horizontal centered
            align-self: center; // vertical centered
        }
    }
    ```
- [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit?qs=object-fit) and [`aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio?qs=asp) to auto size image
    ```SCSS
    .wide-screen {
        display: flex;
        justify-content: center;
        align-items: center;

        .cover-image,
        .media-poster {
            max-inline-size: 50ch;
            object-fit: cover;
            aspect-ratio: 1/1;
        }
    }
    ```
- use "clearfix", fix box collapse with `flow-root`
    ```SCSS
    // Resolution 1:
    .clear-box {
        float: right;//left
        clear: left;//right,both
    }

    // Resolution 2:
    .clear-parent {
        overflow: hidden;
    }

    // Resolution 3:
    .clear-parent {
        display: flow-root;
    }
    ```

##  About Typography
- px, em, rem, ch
- responsive sizing with [max()](https://developer.mozilla.org/en-US/docs/Web/CSS/max), [min()](https://developer.mozilla.org/en-US/docs/Web/CSS/min), [minmax()](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax), [clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- drop cap text
    ```SCSS
    p:first-of-type:first-letter {
        font-size: 4em;
        float: left;
        float: inline-start;
        margin: .1em .1em .1em 0;
        padding: .2em .1em;
        background: hsl(0, 59%, 45%);
        color: white;
        text-shadow: 3px 3px 0 hsl(0, 59%, 80%);
    }
    ```
- truncate text length and numbers of display lines
    ```SCSS
    // Resolution 1:
    .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    // Resolution 2:
    .paragraph {
        height: 6.5rem;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
    ```
- Highlighting text or selection
    ```HTML
    <!-- Highlighting text by default-->
    <p> Highlighting <mark>this text</mark> in default </p>
    ```
    ```SCSS
    // set highlighting style globally
    ::selection {
        color: white
    }
    ```
- customize Css
    ```SCSS
    // Support color scheme: Dark/Light Mode
    :root {
        --background-color: white;
        --font-color: black;

        // nesting calculation properties
        --box-unit: 1rem;
        --base-margin: calc(var(--box-unit) *2)
    }
    @media (prefers-color-scheme: dark) {
        :root {
            --background-color: black;
            --font-color: white;
        }
    }
    body {
        background-color: var(--background-color);
        color: var(--font-color);
    }
    ```
- color palette `hsla`
    - **H**ue： Color Cycle
        - 0/360 Red
        - 60 Yellow
        - 120 Green
        - 180 Cyan
        - 240 Blue
        - 300 Magenta
    - **S**aturation
        - 0% color is Black
        - 50% color mixed with half Black
        - 100% color mixed no Black
    - **L**ightness
        - 0% Black
        - 50% Medium
        - 100% White
    - **A**lpha (optional)

## About Layout
- [FlexBox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
- [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
- `position: fixed;` VS. `position: sticky;`
- `gaps` and `gutters` to flex and grid

***
## <<< [Notes List](../README.md)
***