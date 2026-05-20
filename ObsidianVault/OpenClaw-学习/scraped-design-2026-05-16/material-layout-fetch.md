Layout – Material Design 3

[Skip to main content](/foundations/layout/understanding-layout/overview#main_content)  [search](/search.html)[material\_design

Home](/)[apps

Get started](/get-started)[code

Develop](/develop)[book

Foundations](/foundations)[palette

Styles](/styles)[add\_circle

Components](/components)[pages

Blog](/blog)

play\_arrow

pause

dark\_mode

light\_mode

Layout basics
=============

Layout is the visual arrangement of elements on the screen

[](https://kstatic.googleusercontent.com/files/9743b2c155420a3537e56eccf6fd158e76fea66c0daf57bca09a91e62eb8a13b141d36ddea1fe58ddf0872c180211fb6275769abb1d353d7caed8b35f18ffacd)pause

[Overview](foundations/layout/understanding-layout/overview)[Spacing](foundations/layout/understanding-layout/spacing)[Parts of layout](foundations/layout/understanding-layout/parts-of-layout)[Density](foundations/layout/understanding-layout/density)[Hardware considerations](foundations/layout/understanding-layout/hardware-considerations)[Bidirectionality & RTL](foundations/layout/understanding-layout/bidirectionality-rtl)

On this page

* What’s new
* Layout terms

link

Copy linkLink copied

* Use layout to direct attention to the action users want to take
* Adapt layouts to 

  compact

  Window widths smaller than 600dp, such as a phone in portrait orientation.

  [More on compact window size class](/m3/pages/applying-layout/compact)
  , 

  medium

  Window widths from 600dp to 839dp, such as a tablet or foldable in portrait orientation.

  [More on medium window size class](/m3/pages/applying-layout/medium)
  , 

  expanded

  Window widths 840dp to 1199dp, such as a tablet or foldable in landscape orientation, or desktop.

  [More on expanded window size class](/m3/pages/applying-layout/expanded)
  , 

  large

  Window widths 1200dp to 1599dp, such as desktop.

  [More on large window size](/m3/pages/applying-layout/large-extra-large)
  , and 

  extra-large

  Window widths 1600dp and larger, such as ultra-wide monitors.

  [More on extra-large window size](/m3/pages/applying-layout/large-extra-large)
   window size classes
* Build from an established 

  canonical layout

  Designs for common screen layouts across window size classes
* Consider how spacing and the parts of the layout work together
* Material layout guidance applies to Android and the web

link

Copy linkLink copied

![Terms shown on a screen.  Window means the whole screen.  From left to right are columns, a middle fold with a spacer, a pane and a right-side margin.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxwwo5fb-1-1p.png?alt=media&token=3dacb934-f555-4a6f-a45e-bbef2f208a7f)

1. Column
2. Fold
3. Margin
4. Pane
5. Drag handle
6. Spacer
7. Window

link

Copy linkLink copied

What’s new
----------

link

Copy linkLink copied

* When creating new layouts, begin from a [canonical layout](/m3/pages/canonical-layouts/overview) rather than a layout grid. This helps ensure that your layouts can scale across devices and form factors.
* [Window size classes](/m3/pages/applying-layout/window-size-classes) are opinionated breakpoints. Material Design recommends you create layouts for five window size classes: 

  compact

  Window widths smaller than 600dp, such as a phone in portrait orientation.

  [More on compact window size class](/m3/pages/applying-layout/compact)
  , 

  medium

  Window widths from 600dp to 839dp, such as a tablet or foldable in portrait orientation.

  [More on medium window size class](/m3/pages/applying-layout/medium)
  , 

  expanded

  Window widths 840dp to 1199dp, such as a tablet or foldable in landscape orientation, or desktop.

  [More on expanded window size class](/m3/pages/applying-layout/expanded)
  , 

  large

  Window widths 1200dp to 1599dp, such as desktop.

  [More on large window size](/m3/pages/applying-layout/large-extra-large)
  , and 

  extra-large

  Window widths 1600dp and larger, such as ultra-wide monitors.

  [More on extra-large window size](/m3/pages/applying-layout/large-extra-large)
* Layouts with multiple panes of content can be resized with a drag handle

![Different layouts for differently sized screens ](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flxwwpg71-2.png?alt=media&token=5e7f0ae7-f5d5-44c6-8574-17b622fa7659)

M3 considers multiple layouts for a variety of sizes

link

Copy linkLink copied

Layout terms
------------

link

Copy linkLink copied

* **Column**: one or more vertical blocks of content within a pane
* **Drag handle:** The component that resizes panes
* **Fold**: on foldable devices, a flexible area of the screen or, on dual-screen devices, a hinge that separates two displays
* **Margin**: the space between the edge of the screen and any elements inside of it
* **Multi-window mode**: enables multiple apps to share the same screen simultaneously
* **Pane**: a layout container that houses other components and elements within a single app. A pane can be: fixed, flexible, floating, or semi permanent
* **Spacer**: the space between two panes
* **Window size class**: opinionated breakpoint, the window size at which a layout needs to change to match available space, device conventions, and ergonomics

[arrow\_left\_alt PreviousStates: Overview](/foundations/interaction/states)[Up next arrow\_right\_altLayout basics: Spacing](/foundations/layout/understanding-layout/spacing)

vertical\_align\_top

[material\_design](/)

Material Design is an adaptable system of guidelines, components, and tools that support the best practices of user interface design. Backed by open-source code, Material Design streamlines collaboration between designers and developers, and helps teams quickly build beautiful products.

* ### Social
* [GitHub](https://www.github.com/material-components)
* [X](https://x.com/googledesign)
* [YouTube](https://www.youtube.com/@googledesign)
* [Blog RSS](https://material.io/feed.xml)

* ### Libraries
* [Android](/develop/android/mdc-android)
* [Compose](/develop/android/jetpack-compose)
* [Flutter](/develop/flutter)
* [Web](/develop/web)

* ### Archived versions
* [Material Design 1](https://m1.material.io)
* [Material Design 2](https://m2.material.io)

* [Privacy Policy](https://policies.google.com/privacy)
* [Terms of Service](https://policies.google.com/terms)
* [Join research studies](https://google.qualtrics.com/jfe/form/SV_3NMIMtX0F2zkakR?utm_source=Website&Q_Language=en&utm_campaign=Q2&campaignDate=June2022&referral_code=UXRgbtM2422655&productTag=b2d)
* [Feedback](javascript:void(0))

This website requires JavaScript.