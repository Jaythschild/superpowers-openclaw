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

Color
=====

* [Overview](/elements/color/overview/)
* [Usage](/elements/color/usage/)
* [Tokens](/elements/color/tokens/)
* [Code](/elements/color/code/)

Maintaining consistent and engaging digital interfaces throughout IBM, whether
applications or experiences, demands extended guidance around color usage. The
following concepts provide the foundation as we strive to achieve balance and
harmony through our User Interface design.

* [Introduction](#introduction)
* [Color anatomy](#color-anatomy)
* [Implementing color](#implementing-color)
* [Themes](#themes)
* [Tokens](#tokens)
* [Interaction states](#interaction-states)
* [Accessibility](#accessibility)
* [Resources](#resources)

  
  

Introduction
------------

Application of the color palette brings a unified and recognizable consistency
to IBM’s array of digital products and interfaces. This consistency is grounded
in a set of well-defined rules about how to work with the Carbon component
library in the context of dark and light themes.

![6 screenshots showing a range of color schemes and considerations for text and data visualizations](/4aac660a6246f8324e2c4dd8d47f4fa5/introduction.gif)

Color anatomy
-------------

Carbon’s default themes are derived from the IBM Design Language color palette.
The neutral gray family is dominant in the default themes, making use of subtle
shifts in value to organize content into distinct zones.

The core blue family serves as the primary action color across all IBM products
and experiences. Additional colors are used sparingly and purposefully.

Alert Colors

### Layering model

Colors in the neutral gray palette are layered on top of each other to create
depth and spatial associations. The layering model defines the logic of how
colors stack on top of each other in a UI when using the Carbon themes. Aspects
of the layering model are built directly into the themes, color tokens, and
components.

The layering model differs between the *light* and *dark* themes.

* In the light themes, layers alternate between White and Gray 10 with each
  added layer.
* In the dark themes, layers become one step lighter with each added layer.

![Layering model for light themes](/static/36e551ebb464d12f6372e5f2f32cf8eb/3cbba/color-layering-model.png)

Layering model for the White theme (left) and Gray 100 theme (right)

  

Implementing color
------------------

Carbon uses tokens and themes to manage color. Tokens are role-based, and themes
specify the color values that serve those roles in the UI.

| Term | Definition |
| --- | --- |
| *Theme* | A theme is a collection of colors designed to create a specific aesthetic. Themes control the color value assigned to a token. For example, Gray 100 theme. |
| *Token* | A token is the role-based identifier that assigns a color. Unlike hex codes, tokens apply universally across themes. For example, ```  $layer ```   Copy to clipboard , ```  $border-subtle ```   Copy to clipboard , ```  $support-error ```   Copy to clipboard . |
| *Role* | A role is the systematic usage of a color assigned to a token. Roles cannot be changed between themes. |
| *Value* | A value is the unique visual attribute (hex code, rgba value) assigned to a token through the use of themes. |

Themes
------

Themes serve as an organizational framework for color in Carbon, with each theme
based on a specific primary background color. And they actually get their names
from their background color. There are two default *light* themes and two
default *dark* themes.

The light themes are based on White and Gray 10 backgrounds, and the dark themes
use Gray 100 and Gray 90 backgrounds. Within each theme, the values for the
universal color tokens use the primary background color as the base of its
layering model.

White

Light

Gray 10

Gray 100

Dark

Gray 90

  
 Global background colors 

| Theme | Primary background | Token | Hex value |  |
| --- | --- | --- | --- | --- |
| White | Global Background Light | ```  $background ```   Copy to clipboard | ```  #ffffff ```   Copy to clipboard |  |
| Gray 10 | Global Background Light | ```  $background ```   Copy to clipboard | ```  #f4f4f4 ```   Copy to clipboard |  |
| Gray 90 | Global Background Dark | ```  $background ```   Copy to clipboard | ```  #262626 ```   Copy to clipboard |  |
| Gray 100 | Global Background Dark | ```  $background ```   Copy to clipboard | ```  #161616 ```   Copy to clipboard |  |

  

### Light themes

There are two light themes in Carbon: White and Gray 10. For enabled UI colors
light themes primarily use the color range of White to Gray 20, and for text and
icons uses the color range between Gray 100 and Gray 60.

All of the themes are available in [Design kits](/designing/kits/figma/).

#### Layering model

In the light themes, layers alternate between White and Gray 10.

* **White theme**: uses White as the global background color and is layered
  first with components using Gray 10 backgrounds. The second layer uses White
  and the third layer used Gray 10.
* **Gray 10 theme:** uses Gray 10 as the global background color and is layered
  first with components using White backgrounds. The second layer uses Gray 10
  and the third layer used White.

* White
* Gray 10

![A dashboard in the white theme](/static/86096ef5fa08246767627db3b540bee8/3cbba/color-overview-themes-white.png)

![A dashboard in the Gray 10 theme](/static/70fb8b2110ed368bfddd445cd8395223/3cbba/color-overview-themes-gray10.png)

![Gray 10 dropdown on White background.](/static/b1cd44d8f858c52dc636f04991384a93/377f4/Light_theme_01.png)

Gray 10 dropdown on White background.

![Gray 10 dropdown on a Gray 20 background](/static/197ad7a9d0309f66cf9dcdbfcce3d0f5/377f4/Light_theme_04.png)

Avoid use of midtones.

  

### Dark themes

There are two dark themes: Gray 90 and Gray 100. For enabled UI colors, dark
themes primarily use the color range of Gray 100 through Gray 70, and for text
and icons uses the color range between White and Gray 50.

All of the themes are available in [Design kits](/designing/kits/figma/).

#### Layering model

In the dark themes, layers become one step lighter with each added layer.

* **Gray 90 theme**: uses Gray 90 as the global background color and is layered
  first with components using Gray 80 backgrounds. The second layer uses Gray 70
  and the third layer used Gray 60.
* **Gray 100 theme:** uses Gray 100 as the global background color and is
  layered first with components using Gray 90 backgrounds. The second layer uses
  Gray 80 and the third layer used Gray 70.

* Gray 90
* Gray 100

![A dashboard in the Gray 90 theme](/static/10782fd215266aadea3518ed9d2b3e47/3cbba/color-overview-themes-gray90.png)

![A dashboard in the Gray 100 theme](/static/a9a1624d8c112972dacf4c7bc988c853/3cbba/color-overview-themes-gray100.png)

![Gray 90 dropdown on Gray 100 background](/static/4efcfc381c1013e7dd03d0380e43aeb4/377f4/Dark_theme_01_new.png)

Gray 90 dropdown on Gray 100 background.

![Gray 100 dropdown on Gray 90 background](/static/703e56194e5d65266785b41b56b3172f/377f4/Dark_theme_04_new.png)

Do not apply components that are darker than the background unless using high-contrast mode.

  

### High contrast moments

In some cases, it is helpful to apply light components to dark backgrounds or
dark components to light backgrounds. This technique is useful to focus
attention or create visual tension. Some high contrast moments are baked into
the themes by using the

```
inverse
```

Copy to clipboard

tokens, like the tooltip component. Other
times high contrast moments can be achieved through applying
[inline theming](/elements/color/usage/#inline-theming) for instances like a
dark UI Shell Header with a light theme page.

![High contrast example in a light theme.](/static/4f17ed49f8636e84130a4195f1162ab1/6e9cd/High_contrast_01.png)

![High contrast example in a dark theme.](/static/b9be8234b4efb2738cfb449d18d538d2/6e9cd/High_contrast_02.png)

  

Tokens
------

Tokens are a method of applying color in a consistent, reusable, and scalable
way. They help us abstract how we use color from the values themselves. They are
used in place of hard coded values, like hex codes. Tokens allow for value
changes to be made at scale, making design language changes easy to implement,
as well as making possible color functionalities like inline theming and light
or dark mode.

Each token is assigned a role and a value. The role determines what element to
apply a token too and the value is the actual color (hex code) that appears in
the assigned theme. Color token names and roles are the same across themes, only
the assigned value will change with the theme. For example, under the hood
the

```
$text-secondary
```

Copy to clipboard

 token can dynamically map to

```
Gray 70
```

Copy to clipboard

or

```
Gray 30
```

Copy to clipboard

depending on the theme.

See the [Tokens](/elements/color/tokens/) tab for the full list of color tokens.

### Token names

For quick reference, the role of a token is represented in the token name itself
to help you correctly apply tokens. The first part of the token name references
the general UI element the color is being applied to,
like

```
background
```

Copy to clipboard

,

```
text
```

Copy to clipboard

, or

```
border
```

Copy to clipboard

. The second part of token name will
specify its unique role within the element group
like

```
$border-subtle
```

Copy to clipboard

 or

```
$text-primary
```

Copy to clipboard

. Additionally, some tokens include an
interaction state at the end, like

```
$background-hover
```

Copy to clipboard

.

![Generic text input showing same tokens assigned for White and Gray 100 themes.](/static/7b99254c5d8d9116aaf6c6c464af934b/3cbba/color-overview-tokens.png)

Color tokens for components are the same across themes as shown by this text
input using the White theme (left) and Gray 100 theme (right).

  

### Core tokens

Color tokens that can be applied across components are called *core tokens*.
There are ten main groups of core color tokens. They are grouped by the common
UI element that they are applied to. Token groups makes it easier to find and
apply color tokens. Interaction state tokens are included in the group along
side their enabled state tokens. There are a few core tokens that do not belong
to the a group and stand as individual tokens like

```
$overlay
```

Copy to clipboard

,

```
$highlight
```

Copy to clipboard

,
and

```
$interactive
```

Copy to clipboard

.

Some core tokens are part of an additional token group called *layering tokens*.
These tokens are used to implement the layering model onto components. For more
information, see the [Usage](/elements/color/usage/) tab.

| Token group | Applied to |
| --- | --- |
| Background | Page or primary backgrounds |
| Layer | Stacked backgrounds (includes layering tokens) |
| Field | Form and input backgrounds (includes layering tokens) |
| Border | Dividers, rules, and borders between and around elements (includes layering tokens) |
| Text | Type and type styles |
| Link | Standalone and inline links |
| Icon | Icons and pictograms |
| Support | Notification elements and status indicators |
| Focus | Focus states |
| Skeleton | Skeleton states |

  

### Component tokens

Some components have their own specific color tokens, known as *component
tokens*. They represent the properties associated with a particular component.
They are not global tokens like the core tokens and should never be used for
anything other than their own component. For a full list for component tokens
see the [Tokens](/elements/color/tokens/) tab.

To see how the tokens are applied in the components themselves, visit the
component’s style page.

* [Button](/components/button/style#color)
* [Tag](/components/tag/style#color)
* [Notification](/components/notification/style#color)

Interaction states
------------------

In addition to the core set of enabled-state tokens, there are five other
interaction states defined with tokens for each theme. Interaction tokens are
signified by the addition of a state name added to the end of the base token
name. For example, the

```
$background
```

Copy to clipboard

hover state token is

```
$background-hover
```

Copy to clipboard

.

The color layering model for interaction tokens is as follows:

* For values between Black and Gray 70, interaction gets lighter.
* For values between Gray 60 and White, interaction gets darker.

![Hover states palette](/static/1922672ce086617a3e58600ca78c7e84/3cbba/color-overview-interactive.png)

  

### Hover

Hover is a subtle visual change that appears when a mouse cursor moves over an
interactive element. Hover states have their own tokens and are identified by

```
-hover
```

Copy to clipboard

 added to the end of the base token name, such as

```
$background-hover
```

Copy to clipboard

.

In the IBM themes, hover states token values are “half steps” between two
adjacent colors on the IBM core color palette steps. These values fall outside
of the IBM core color palette steps and have their own spectrum. Hover colors
should not be used for anything other hover states.

* For values between Black and 70, the hover state is a half step lighter.
* For values between 60 and White, the hover state is a half step darker.

Elements like text or icons that use

```
secondary
```

Copy to clipboard

colors for their enabled state,
will change to the

```
primary
```

Copy to clipboard

color on hover, giving them a subtle emphasis. Most
of the time, this shift in color (on the text or icon element) will be
accompanied by a background hover color shift as well. For example, an overflow
menu uses

```
$text-secondary
```

Copy to clipboard

and

```
$layer
```

Copy to clipboard

in its enabled state. On hover, the
text switches to

```
$text-primary
```

Copy to clipboard

and the background to

```
$layer-hover
```

Copy to clipboard

.

![Hover state colors are half steps](/static/1d80c1d6da4359aab3a651617736fb37/3cbba/color-overview-interactive-hover.png)

Shown in the white theme, ‘$layer’ enabled color (1) has a value of 10 and
‘$layer-hover’ (2) has a value of 15.

  

### Active

The active state can be used to indicate a

```
click
```

Copy to clipboard

,

```
tap
```

Copy to clipboard

or down press of a
button. Active tokens are identified by

```
-active
```

Copy to clipboard

added after the base token
name, such as

```
$button-primary-active
```

Copy to clipboard

. Active state values are two full steps
lighter or darker on the IBM color scale. For example, the Blue 60 active state
is Blue 80.

* For values between 100 and 70, the active state is two full steps lighter.
* For values between 60 and 10, the active state is two full steps darker.

The exceptions are that White value shares the same active state value as Gray
10, and Black value shares the same active state value as Gray 100.

![Active state colors are two steps over](/static/a03a2c73cb2dcce79cfe2bb868257358/3cbba/color-overview-interactive-active.png)

Shown in the White theme,

```
$button-primary
```

Copy to clipboard

enabled color (1) has a value of
Blue 60 and

```
$button-primary-active
```

Copy to clipboard

active color (2) has a value of Blue 80.

  

### Selected

Selected states indicate item(s) or option(s) that have been chosen in the UI by
the user through any input method. Selected tokens are identified by the

```
-selected
```

Copy to clipboard

added after base token name, such as

```
$layer-selected-01
```

Copy to clipboard

. The color
logic for selected state is either one full step lighter or darker on the IBM
color scale. For example, the Gray100 selected state is Gray 90.

* For values between 100 and 70, the selected state is one full step lighter.
* For values between 60 and 10, the selected state one full step darker.

The exception is that White shares the same selected state value as Gray 10, and
Black shares the same selected state value as Gray 100.

Elements like text or icons that use

```
secondary
```

Copy to clipboard

colors for their enabled state,
will change to the

```
primary
```

Copy to clipboard

color when selected, giving them a subtle emphasis.
Most of the time, this shift in color (to the text or icon element) will be
accompanied by a selected background color shift as well.

![Selected state colors are one step over](/static/9ec23fa753b5dfe46f765df7f13676e0/3cbba/color-overview-interactive-selected.png)

Shown in the white theme,

```
$layer
```

Copy to clipboard

enabled color (1) has a value of Gray 10
and

```
$layer-selected
```

Copy to clipboard

selected color (2) has a value of Gray 20.

  

### Focus

The focus state draws attention to the active element on a page when using the
keyboard or voice to navigate. In Carbon, the focus of an element is most
commonly indicated by a 2px border around the element. In order to make it easy
to identify and locate on a page, most focus states use only one color per theme
controlled through the

```
$focus
```

Copy to clipboard

color token.

* In the light themes, the focus state usually appears as a Blue 60 border.
* In the dark themes, the focus state usually appears as a White border.

The exception is high contrast moments where a

```
$focus-inverse
```

Copy to clipboard

color is used
instead.

Focus states are required on all interactive elements and must pass 3:1 color
contrast accessibility. Often times to achieve proper 3:1 contrast a

```
$focus-inset
```

Copy to clipboard

border is used between the focus border and the element itself.

![Focus state colors](/static/80044c3fd967cfd793ba9ecdf1186c88/3cbba/color-overview-interactive-focus.png)

White theme

```
$focus
```

Copy to clipboard

color (1) and Gray 90 theme

```
$focus
```

Copy to clipboard

color (2).

  

### Disabled

A disabled state is applied to a component when the user is not allowed to
interact with the component due to either permissions, dependencies, or
pre-requisites. Disabled states completely remove the interactive function of a
component and therefore don’t receive hover or focus. Disabled state styling is
not subject to WC3 contrast compliance standards and is intentionally
de-emphasized in a faded fashion.

Disabled elements are always styled in the Gray family no matter its base color.
A component’s specific styling will depend on the elements within it and what
layers they are placed on. Some tokens have their own specific disabled tokens,
such as

```
$layer-disabled
```

Copy to clipboard

, while other elements are grouped together and share a
disabled token like

```
$text-disabled
```

Copy to clipboard

.

* For the light themes, disabled color values range from White to Gray 50
* For the dark themes, disabled color values range from Gray 90 to Gray 40

Accessibility
-------------

Using various forms of contrast is the most important consideration when making
user-friendly color and interface choices. Awareness of standards and best
practices is the key to accessible color selections.

[##### IBM Design Language: Accessibility](https://www.ibm.com/design/language/color#accessibility)

[##### IBM Accessibility: Color and Contrast](https://www.ibm.com/able/toolkit/design/visual/color-and-contrast)

### Contrast ratios

Contrast is the difference in brightness between any two elements. The
[Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG21/) set
specific ratios that achieve the minimum required contrast for legibility.
Generally speaking, small text is any size below 24px and requires a 4.5:1
contrast ratio. Large text is anything above 24px and requires a 3:1 contrast
ratio. Graphical elements, such as data visualizations, also require a 3:1
contrast ratio.

The IBM palette is comprised of twelve color grades—Black, White and ten values
for each hue. The following table indicates the minimum number of steps required
to achieve commonly used contrast ratios between any two colors.

![color grades graphic](/static/7907a5140ba1484f3317f634a57662dd/3cbba/colorgrades_table.png)

| Color 1 | Color 2 (4.5:1 contrast) | Color 2 (3:1 contrast) |
| --- | --- | --- |
| Black | 50 through White (6 steps) | 60 through White (5 steps) |
| 100 | 50 through White (5 steps) | 60 through White (4 steps) |
| 90 | 50 through White (4 steps) | 60 through White (3 steps) |
| 80 | 40 through White (4 steps) | 50 through White (3 steps) |
| 70 | 30 through White (4 steps) | 40 through White (3 steps) |
| 60 | 20 through White (4 steps) | 20 through White (4 steps) |
| 50 | 90 through Black (4 steps) | 80 through Black (3 steps) |
| 40 | 80 through Black (4 steps) | 70 through Black (3 steps) |
| 30 | 70 through Black (4 steps) | 70 through Black (4 steps) |
| 20 | 70 through Black (5 steps) | 60 through Black (4 steps) |
| 10 | 60 through Black (5 steps) | 50 through Black (4 steps) |
| White | 60 through Black (6 steps) | 50 through Black (5 steps) |

Resources
---------

[##### RGB color palettes (.ase and .clr)

![ase icon](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABBCAMAAABW61JJAAAAk1BMVEX///8AAGUHAs3a29zU1dbW2NkBAHEFAnny8vH4+PgFAbtCQIsBAEDn6One4OALBdn///duZPtHO/3ExckIBokYDfKSjfNraaX4/OcEAVgpMJYCAPAtIPux+v9ZTvyd4P9OStsAACF5nN4yMGerpvuBfuEIBKCFvffExPBGUKtFX7ZkcsSHh6Tb2fozL8ZbgMwlJVHTp/9BAAAACXBIWXMAAAsTAAALEwEAmpwYAAADbUlEQVR42u2WbVejPBCGE6AhaYGiYLtEEZe+UKBd/P+/bmcSQsFS2upzzvNlLzwasfeVmTFYSRTYPyCIiE1+RPBP8F8IZv+TQGi0QHzjYyAg6l7/02AxWGp4J7C/2wIXeAmIO7oeQg7b7UFfPtmuti2CrDqIvwNWu7qu81BwRAl0LWT1/K55PpHnl7cWEb4aXsjBsqyl5TKXSjIieH/SvJ/I09tzixAvry+K1zcQLJfL2I1jV15UIMKeIJwQYP4sEA8KlpbKo4D7iHAeEpza/KWA31lBmweB6Av4vRVEbf4s4A9VEF4TtBV05+AQ9s6B6M7BMoyYq2FS+EYQmQq607c6wdogxFNb2UctnNJQcz/ASwu4MvSeHd5/bHvPvn++Hai87+sK8LkIt7t2090pXJn1iotccQS4c2xZH/3W0LaAM/iwDAfyZz9v8UXswug84JNEvw2f0ALSr+ADDzqCgvlZsI/3e+olibcJI6/l92YgUId6SoD5r4JAC6IJgWUEKn9dIG5VkKh8kmzE9wS0zXsXAjvAd+erAtWB5QemgGEFeoZBcKMCa+7MktEK/MD8f9AT9M6B6YA5gQl5n6J3DkYEuw/DIaz/6JVcOMGiZbPg0cawDoIZogRcI0KD4OoLIb84t2e8wwm61/oQtuEaCDrMOnBsG17XcV4H9mx2UcEXMD+7yZTgnvx1wX37TwlU3rlxXReo/B0lOFcEkL+TccH9+XHBA/lRwSN5x47wP5SwB3z36wHCGTnWuwH1+hHKI1nsre7Pz9yy9vQxFmQxt84s91S//cGP9IJRtWT65e5X2FDQ5ZmUMsYlZbIspctiqXDZpOC8f5xlaQX7UZlnaZqWXpVmcCuTdErQ5V1aZkWWU8bcIs3rppBelRX4DhlPVXDOu7TJmgK2ozLLpIeVVGlBk+kZ9PKwcSZz6AEFTQw5FFzsPhT08tB5mkPX0ANt0jTLoRRooYCu2NUW+nmX1mmDY4gZo1WBs/NuCQZ5xnIYOYyxpPD7ZyUMMimnWxjkoQM18iJrUJB4NQwQBPgeycYFwzxOLKc0adKCxXklsQJsoaqqWo628CXPWAEjwEmmMk6RPMaDhKty7CBZ80Eeji3sBMW7uGFZN00Jg5B1hYxWsL8YLVW9MnyIqH6WzMM0OgO4/X3gcV7LxQ+Q679iu7YruiXjZAAAAABJRU5ErkJggg==)](https://github.com/carbon-design-system/carbon/raw/refs/heads/main/packages/colors/artifacts/IBM_Colors.zip)

[##### Elements package: Color](https://github.com/carbon-design-system/carbon/tree/main/packages/colors)

[Edit this page on GitHub](https://github.com/carbon-design-system/carbon-website/edit/main/src/pages/elements/color/overview.mdx)

[Previous

Elements: 2x Grid](/elements/2x-grid/overview/)

[Next

Color: Usage](/elements/color/usage/)

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