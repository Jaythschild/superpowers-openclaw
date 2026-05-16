Color - Material Design 3 - Create personal color schemes

[Skip to main content](/styles/color/system#main_content)  [search](/search.html)[material\_design

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

Color system
============

Create accessible, personal color schemes communicating your product's hierarchy, state, and brand

[](https://kstatic.googleusercontent.com/files/bcec1828fdb919e9e7250f3232e3f82c0ad4754f443ae245445fb2303b6c54ccc0fad1986b2bb01d11cf80ab570fa1a0fb511ea99d31bfe8d742dd6e1c9f335d)pause

[Overview](styles/color/system/overview)[How the system works](styles/color/system/how-the-system-works)

On this page

* Resources
* What's new

link

Copy linkLink copied

**The Material color system includes:**

* Built-in set of 

  accessible color relationships

  For example, a dark surface color is algorithmically paired with a light text label color so the UI automatically meets contrast requirements.

  [More on color relationships](/m3/pages/color/how-the-system-works#e1e92a3b-8702-46b6-8132-58321aa600bd)
* 26+ color roles

  Color roles are assigned to UI elements based on emphasis, container type, and relationship with other elements. This ensures proper contrast and usage in any color scheme.

  [More on color roles](/m3/pages/color-roles)
   mapped to Material Components
* Built-in 

  dark theme

  A dark theme is a low-light version of a UI that displays mostly dark surfaces.
   colors
* Static 

  baseline color scheme

  Baseline is the default static color scheme for Material products. It includes colors for both light and dark themes.

  [More on the baseline color scheme](/m3/pages/static/baseline)
   with default colors assigned to each color role
* Dynamic color

  Dynamic color takes a single color from a user's wallpaper or in-app content and creates an accessible color scheme assigned to elements in the UI.

  [More on dynamic color](/m3/pages/dynamic/choosing-a-source)
   features including 

  user-generated

  User-generated color dynamically creates a color scheme from a user's wallpaper.

  [More on user-generated color](/m3/pages/dynamic/user-generated-source)
   and 

  content-based color

  Content-based color dynamically creates a color scheme from in-app content like a music album or book cover.

  [More on content-based color](/m3/pages/dynamic/content-based-source)

[Learn how the system works](/m3/pages/color/how-the-system-works)

link

Copy linkLink copied

For products migrating from M2 to M3, start by mapping the 

baseline color scheme

Baseline is the default static color scheme for Material products. It includes colors for both light and dark themes.

[More on the baseline color scheme](/m3/pages/static/baseline)
 to your existing product. It can easily switch to dynamic color when ready.

link

Copy linkLink copied

[](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Flinbli4g-MAT020.01-v4.mp4?alt=media&token=9731ccc6-7d03-42ec-bff6-115bddc39fc0)pause

Learn about the value and function of Material 3’s dynamic color system and how it differs from past color systems

link

Copy linkLink copied

![Primary, on primary, primary container, and on primary container roles shown in baseline light theme color scheme.](https://lh3.googleusercontent.com/5J0Ys6e-vzMeQPCfAMQcY147g2yFpXFrJEZK-AB8x8wGKMzdeQX3_GxE-xCOwuBANbYWr-g29epip05CF7fTGVz5gTc7wTBzFNp7AzXmdCVX=w40)

The baseline color scheme doesn't dynamically change

![Diagram showing an input color resulting in a simplified illustration of four roles of a color scheme. Shown in green and yellow in light theme.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9uoi8a-dynamic%20color.png?alt=media&token=a7969547-b71e-4d76-84d6-fe0ad98c7e62)

A dynamic color scheme changes the UI's colors based on different inputs, like a wallpaper

![Diagram showing an orange input color generating a static orange color scheme for an auto heating UI element.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9uorlq-semantic-colors.png?alt=media&token=32f5150c-8487-48f8-bdc1-4491dc057f84)

Specific colors, such as semantic colors, can be set to not dynamically change

link

Copy linkLink copied

Products with 

dynamic color

Dynamic color takes a single color from a user's wallpaper or in-app content and creates an accessible color scheme assigned to elements in the UI.

[More on dynamic color](/m3/pages/dynamic/choosing-a-source)
 can automatically generate and assign colors to each element in the UI.

This provides:

* Personalized UI
* Accessible contrast
* User-controlled contrast
* Automatic dark theme

[](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0ob8aeg-Untitled%20video%20(1).mp4?alt=media&token=983ab349-d3b4-44ed-81c6-8e5e491130a3)pause

The UI colors change dynamically

link

Copy linkLink copied

Resources
---------

| Type | Link | Status |
| --- | --- | --- |
| Design | [Design Kit](https://www.figma.com/community/file/1035203688168086460) (Figma) | Available |
| Implementation | [MDC-Android](https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md) | Available |
| [Jetpack Compose](https://developer.android.com/develop/ui/compose/designsystems/material3#dynamic_color_schemes) | Available |
| [Flutter](https://pub.dev/packages/dynamic_color) | Available |
| Tools | [Material Theme Builder](https://www.figma.com/community/plugin/1034969338659738588/material-theme-builder) | Available |

link

Copy linkLink copied

What's new
----------

link

Copy linkLink copied

May 2025

### Three levels of contrast

Color roles support three levels of contrast so people can select the one that best suits their vision needs. Contrasts also are tokenized.

link

Copy linkLink copied

![](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmhpboqil-05.png?alt=media&token=7929e04e-f18a-40f8-9d49-e136beadbb3c)

Standard contrast

![](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmhpbny9u-06.png?alt=media&token=017a2472-3dc0-4251-bebf-493eb445ea9c)

Medium contrast

![](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmhpblpsr-07.png?alt=media&token=5891da95-e18f-4b97-b8c2-354b6b209dd4)

High contrast

link

Copy linkLink copied

August 2024

### More colorful text and icons

The following color roles are updated in light theme to be more colorful while still having accessible color contrast:

* On primary container
* On secondary container
* On tertiary container
* On error container

Affected components:

* Badges
* Bottom app bar
* Buttons
  + Buttons
  + Extended FAB
  + FAB
  + Icon buttons
  + Segmented buttons
* Chips
* Lists
* Menus
* Navigation bar
* Navigation drawer
* Navigation rail
* Switches

![Comparison of the color before and after the update, with FAB and button examples.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flzij6msk-whats-new-on-color.png?alt=media&token=73b4aa74-f663-4f67-a65e-a4ed97b6a556)

Colors used for text and icons now appear more colorful

link

Copy linkLink copied

Oct 2023

### Reorganized guidelines

Same color system, explained in a new way. Updated sections include:

* [How the system works](/m3/pages/color/how-the-system-works)
* [Advanced customizations](/m3/pages/advanced/overview)
* [Color resources](/m3/pages/color-resources)

![Diagram illustrating guidelines being reorganized](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9upnnh-reorganized-guidelines.png?alt=media&token=57c601ca-75fe-49c9-aef5-952f3bf00e68)

The guidelines have been reorganized and updated

link

Copy linkLink copied

Feb 2023

### Tone-based surface colors

[Tone-based surface color roles](https://material.io/blog/tone-based-surface-color-m3) have replaced the previous approach of surfaces at +1 to +5 elevation.  The new color roles are not tied to 

elevation

Elevation is the distance between two surfaces on the z-axis.

[More on elevation](/m3/pages/elevation/overview)
 and offer more flexibility and support for color features, such as 

user-controlled contrast

User-controlled contrast is a dynamic color feature enabling users to choose from one of three levels of color contrast: standard, medium, and high.

[More on user-controlled contrast](/m3/pages/color/how-the-system-works#0207ef40-7f0d-4da8-9280-f062aa6b3e04)
.

![Simplified tablet UI showcasing the application of surface roles, shown in light theme](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9urd5o-%5B1P%5D%20what-is-new-surface.png?alt=media&token=0c9aba76-eda9-4503-ac75-6114e7e99d8b)

New tone-based surface colors offer more flexibility and support

link

Copy linkLink copied

Technical changes were made to align the color system with Android SysUI:

* Updated the default light theme surface from tone 99 to tone 98
* Updated the chroma for the neutral palette, increasing it from 4 to 6
* Slightly darkened surface roles in dark theme

![Before and after swatch of the default light theme surface, showcasing the difference in chroma and tone](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9urxta-chroma-tone-update.png?alt=media&token=9ae5f3c9-525d-4602-b0ed-d59af40ba43e)

Changes in tone and chroma in the default light theme surface

link

Copy linkLink copied

Feb 2023

### Additional accent colors

Additional accent colors in the scheme provide more flexibility and choice for color application. In particular, a new set of 

fixed colors

Fixed colors keep the same color value in light and dark themes, as opposed to regular container colors, which change tone between themes, or static colors, which don't change at all.

[More on fixed colors](/m3/pages/color-roles/tab-1#26b6a882-064d-4668-b096-c51142477850)
 for the **primary**, **secondary**, and **tertiary** accent groups provide colors which stay the same across light and dark themes.

![Fab and star icon show in fixed and fixed dim roles, in both light and dark theme](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgm3sandbox%2Fimages%2Fln9utr1z-whats-new-fixed-colors.png?alt=media&token=5f8ce61b-6eb8-4b8f-a336-08b01c9af58a)

Additional accent colors provide more choice for color application

[arrow\_left\_alt PreviousMaterial A-Z](/foundations/glossary)[Up next arrow\_right\_altColor system: How the system works](/styles/color/system/how-the-system-works)

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