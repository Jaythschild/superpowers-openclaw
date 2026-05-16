[Skip to main content](#main-content)[Carbon Design System](/)

Search

Switch sites

* Foundations
* [IBM Brand Center](https://ibm.com/brand)
* [IBM Design Language](https://ibm.com/design/language)
* Implementation
* [Carbon Design System](https://www.carbondesignsystem.com/)
* [Carbon for IBM Products](http://ibm.biz/carbon4ibmproducts)
* [Carbon for Cloud](https://ibm.biz/carbon4cloud)
* [Carbon for IBM.com](https://www.ibm.com/standards/carbon/)
* [IBM Event Design](https://www.ibm.com/design/event/)
* [IBM Workplace Design](https://www.ibm.com/design/workplace/)
* Practices
* [Enterprise Design Thinking](https://www.ibm.com/design/thinking/)
* [IBM Accessibility](https://www.ibm.com/able/)
* [IBM Design for AI](https://www.ibm.com/design/ai)
* [IBM Design Research](https://www.ibm.com/design/research/)
* [IBM Experience Standards](https://w3.ibm.com/design/experience-standards/)
* Community
* [IBM Design](https://w3.ibm.com/design/)

---

* [GitHub](https://github.com/carbon-design-system/carbon)

Collapse navigation items

Typography
==========

* [Overview](/elements/typography/overview/)
* [Style strategies](/elements/typography/style-strategies/)
* [Type sets](/elements/typography/type-sets/)
* [Code](/elements/typography/code/)

Our approach to the typographic system uses IBM Plex as its typeface. It has
been carefully engineered with suitable scales, styles, and weights to help
create clear hierarchies and organize information that guides users through IBM
products or experiences.

* [Type tokens and sets](#type-tokens-and-sets)
* [Typeface: IBM Plex](#typeface:-ibm-plex)
* [Scale](#scale)
* [Style](#style)
* [Type color](#type-color)
* [Resources](#resources)

Type tokens and sets
--------------------

Carbon uses type tokens across two type sets to manage typography. Type tokens
are pre-set configurations of typographic elements such as font size, weight, or
leading (line height) that are specifically calibrated for use alongside
[IBM Plex](http://ibm.com/plex) in product. Selecting the appropriate type style
is determined by layout or template structure. Layouts may have several levels
of architecture or areas that require varying typographic hierarchies.

### Productive and expressive type sets

The productive type set is primarily used within product spaces, where users
benefit from a more condensed treatment of content to maintain focus on tasks.
The productive styles work together to support the hierarchy of information and
set user expectations. On the other hand, the larger expressive type styles
allow for a more dramatic, graphic use of type in editorial and marketing
design. These type styles are excellent for long form reading and scanning, but
would be distracting if used in product.

Within **Body styles** and **Utility styles**, the same set of styles are
offered. Productive styles are named with a suffix of

```
-01
```

Copy to clipboard

and expressive style
names have a suffix of

```
-02
```

Copy to clipboard

.

There are two heading sets and the major difference between them is in how they
are implemented in code. The productive type set uses fixed headings. Expressive
headings are responsive and the type styles change size at different
breakpoints.

For more detail, see [Style strategies](/elements/typography/style-strategies/)
and [Type sets](/elements/typography/type-sets/).

Typeface: IBM Plex
------------------

Carbon uses the open-source typeface **IBM Plex**. It has been carefully
designed to meet IBM’s needs as a global technology company and reflect IBM’s
spirit, beliefs, and design principles. IBM Plex can be accessed and downloaded
from the [Plex GitHub Repo](https://github.com/ibm/plex).

IBM Plex Sans

IBM Plex Serif

IBM Plex Mono

### Sans-serif font stack

```
```
font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
```



Copy to clipboard
```

### Serif font stack

```
```
font-family: 'IBM Plex Serif', 'Georgia', Times, serif;
```



Copy to clipboard
```

### Mono font stack

```
```
font-family: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono',



'Bitstream Vera Sans Mono', Courier, monospace;
```



Copy to clipboard
```

Scale
-----

The IBM type scale is built on a single equation. The formula for our scale was
created to provide hierarchy for all types of experiences. The formula assumes
that y₀=12 px.

  

| rem | px |
| --- | --- |
| 0.75 | Plex 12 |
| 0.875 | Plex 14 |
| 1 | Plex 16 |
| 1.125 | Plex 18 |
| 1.25 | Plex 20 |
| 1.5 | Plex 24 |
| 1.75 | Plex 28 |
| 2 | Plex 32 |
| 2.25 | Plex 36 |
| 2.625 | Plex 42 |
| 3 | Plex 48 |
| 3.375 | Plex 54 |
| 3.75 | Plex 60 |
| 4.25 | Plex 68 |
| 4.75 | Plex 76 |
| 5.25 | Plex 84 |
| 5.75 | Plex 92 |

```
```
Xn = Xn-1 + {INT[(n-2)/4] + 1} * 2



Xn: step n type size Xn-1: step n-1 type size
```



Copy to clipboard
```

Style
-----

Typography creates purposeful texture, guiding users to read and understand the
hierarchy of information. The right typographic treatment and the controlled
usage of type styles helps manage the display of content, keeping it useful,
simple, and effective.

### Weights

Font weight is an important typographic variable that can add emphasis and
differentiate content hierarchy. Font weight and size pairings must be carefully
balanced. A bold weight will always have more emphasis than a lighter weight
font of the same size. However, a lighter weight font can rank hierarchically
higher than a bold font if the lighter weight type size is significantly larger
than the bold one.

We suggest using IBM Plex Light, Regular, and SemiBold for digital experiences.
The semibold weight is ideal for section headers, but should not be used for
long text.

Semibold (600)

Regular (400)

Light (300)

### Italic

Each weight has an italic style, which should only be used when you need to
emphasize certain words in a sentence (i.e., titles of works, technical terms,
names of devices, and captions).

Semibold Italic (600)

Regular (400)

Light (300)

Type color
----------

Type color should be carefully considered, with legibility and accessibility as
paramount concerns. Keep type color neutral in running text. Use primary blue
for primary actions.

![Neutral color for text](/c62b2ead82d277c708c6478416bc2ed7/Typography_overview_Type-color-1.svg)

![I'm a magenta sentence for no reason](/6dd70c4eb05b74e0e64e319efb96e9ae/Typography_overview_Type-color-2.svg)

![Neutral color for text](/bd205bd9e609d2c3fa668c47f287d18e/Typography_overview_Type-color-3.svg)

![Color is not for decoration](/85e6ec7a8f025768a2fb99158980ebaf/Typography_overview_Type-color-4.svg)

![Link with icon](/d71ae288b89e4368fb7dd5fdb9bdf49b/Typography_overview_Type-color-5.svg)

Core blue colors are used for text links and primary actions

![Download with icon](/7470031ea82790f8813a4e3e9cb23e52/Typography_overview_Type-color-6.svg)

Secondary actions use Gray 100 and icons

![Oops, something went wrong! colored text](/b42ebaf8b4289e1da89c9b184b6bec3f/Typography_overview_Type-color-7.svg)

Other use cases for colored type are code snippets, warnings, alerts, etc.

![Code snippet with colored highlight type](/b73c46a93802fc24874a9f3159a16d63/Typography_overview_Type-color-8.svg)

Resources
---------

[##### Get the latest IBM Plex™ download on GitHub](https://github.com/ibm/plex/releases/latest)

[##### Visit the IBM Plex™ website to learn more](https://www.ibm.com/plex/)

[##### Elements package: Type](https://github.com/carbon-design-system/carbon/tree/main/packages/type)

[##### Type package preview

![codesandbox icon](data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuNCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cmVjdCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0ibm9uZSIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIi8+CjxnPgoJPHBhdGggZD0iTTE0LjgsMjYuN1YxNi42bC04LjctNXY1LjhsNCwyLjNWMjRMMTQuOCwyNi43eiBNMTcuMSwyNi44bDQuOC0yLjh2LTQuNGw0LTIuM3YtNS43bC04LjgsNS4xVjI2Ljh6IE0yNC43LDkuN0wyMC4xLDcKCQlMMTYsOS4zTDExLjksN0w3LjMsOS43bDguNyw1TDI0LjcsOS43eiBNMy45LDIzdi0xNEwxNiwybDEyLjEsN3YxNEwxNiwzMEwzLjksMjN6Ii8+CjwvZz4KPC9zdmc+Cg==)](https://github.com/carbon-design-system/carbon/tree/main/packages/type)

[Edit this page on GitHub](https://github.com/carbon-design-system/carbon-website/edit/main/src/pages/elements/typography/overview.mdx)

[Previous

Elements: Themes](/elements/themes/overview/)

[Next

Typography: Style strategies](/elements/typography/style-strategies/)

* [Contact us](https://www.carbondesignsystem.com/help/contact-us)
* [Privacy](https://www.ibm.com/privacy)
* [Terms of use](https://www.ibm.com/legal)
* [Accessibility](https://www.ibm.com/able)
* [IBM.com](https://www.ibm.com/)

* [Medium](https://medium.com/carbondesign)
* [𝕏](https://x.com/_carbondesign)

Have questions? Email us   
at [carbon@us.ibm.com](mailto:carbon@us.ibm.com)   
or open an issue on [GitHub.](https://github.com/carbon-design-system/carbon-website/issues/new)

React Components version ^1.105.0  
Last updated 15 May 2026  
Copyright © 2026 IBM