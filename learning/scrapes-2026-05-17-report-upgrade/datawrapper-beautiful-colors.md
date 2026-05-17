How to pick more beautiful colors for your data visualizations | Datawrapper Blog

[Skip to main content](#main-content) 

[Datawrapper logo](/) [Blog](/blog)

* [Features](/features)  Open Features dropdown
* [Learn](/learn)  Open Learn dropdown
* [Pricing](/pricing)
* [Contact](/contact)

Sign in

Sign in

This article is brought to you by **Datawrapper**, a data visualization
tool for creating **charts**, **maps**, and **tables**. [**Learn more**](https://www.datawrapper.de/).

[All Blog Categories](#all-categories)

[Color in data vis](/blog/category/color-in-data-vis)

18 min

September 4th, 2020

How to pick more beautiful colors for your data visualizations
==============================================================

Choosing good colors for your charts is hard. This article tries to make it easier.

![Portrait of Lisa Charlotte Muth](https://datawrapper.de/cdn-cgi/image/quality=85,width=1000,height=999,f=auto,fit=cover/https://kirby.datawrapper.de/media/users/i4kiysNg/13f8939ae0-1740408933/profile.webp)

Lisa Charlotte Muth

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1600,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/8d4729a3c7-1740123117/full-200805_goodcolors34-1.png)

Choosing good colors for your charts is hard. This article tries to make it easier.

I want you to feel more confident in your color choices. And if you have no sense of color at all, here's my attempt to help you find good ones anyway. We'll talk about common color mistakes I see out there in the wild and how to avoid them.

This is not the right article for you if you're trying to find good gradients or shades. But if you need to find beautiful, distinctive colors for different **categories (e.g., continents, industries, bird species)** for your line charts, pie charts, stacked bar charts, etc., then read on.

![Visualized categories by <a href="https://fivethirtyeight.com/features/the-56-best-and-weirdest-charts-we-made-in-2019/">FiveThirtyEight</a>, <a href="https://whydocatsanddogs.com/cats">Nadieh Bremer</a>, <a href="https://congress.pudding.cool/">The Pudding</a>, <a href="https://www.nytimes.com/interactive/2019/10/14/us/politics/democrats-political-facebook-ads.html">New York Times</a>, <a href="https://infographics.economist.com/2019/AChristmasGiftForYou/AYearInGraphicDetail.pdf">The Economist</a>, and <a href="https://medium.com/accurat-studio/beautiful-reasons-c1c6926ab7d7">Akkurat</a>](https://datawrapper.de/cdn-cgi/image/quality=85,width=1600,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/09dabdbd06-1740123117/full-200805_goodcolors-f.png)

Visualized categories by [FiveThirtyEight](https://fivethirtyeight.com/features/the-56-best-and-weirdest-charts-we-made-in-2019/), [Nadieh Bremer](https://whydocatsanddogs.com/cats), [The Pudding](https://congress.pudding.cool/), [New York Times](https://www.nytimes.com/interactive/2019/10/14/us/politics/democrats-political-facebook-ads.html), [The Economist](https://infographics.economist.com/2019/AChristmasGiftForYou/AYearInGraphicDetail.pdf), and [Akkurat](https://medium.com/accurat-studio/beautiful-reasons-c1c6926ab7d7)

#### Index

[**00** Before we start…](#before-we-start)[**01** Broaden your understanding of colors](#broaden-your-understanding-of-colors)[**02** Don't dance all over the color wheel](#don-t-dance-all-over-the-color-wheel)[**03** Use saturation and lightness to make your hues work](#use-saturation-and-lightness-to-make-your-hues-work)[**04** Use warm colors & blue](#use-warm-colors-amp-blue)[**05** When using green, make it a yellow or blue one](#when-using-green-make-it-a-yellow-or-blue-one)[**06** Avoid pure colors](#avoid-pure-colors)[**07** Avoid bright, saturated colors](#avoid-bright-saturated-colors)[**08** Combine colors with different lightness](#combine-colors-with-different-lightness)[**09** Make your colors equally "colorful"](#make-your-colors-similarly-colorful)[**10** Avoid too little contrast with the background](#avoid-too-little-contrast-with-the-background)[**11** Avoid too much contrast with the background](#avoid-too-much-contrast-with-the-background)[**12** Choose a background that's desaturated enough](#choose-a-background-that-s-desaturated-enough)[**13** Copy colors, or understand them](#copy-colors-or-understand-them)

#### Before we start…

I will mention saturation, brightness, and hue a lot. The HSB (**H**ue, **S**aturation, **B**rightness) or HSV (**H**ue, **S**aturation, **V**alue) color spaces work fairly well to check them:

* **Hue** ranges from 0° to 360° — that's your typical color wheel: ⬤⬤⬤
* **Saturation** ranges from 0% (gray) to 100% (super duper colorful!!): ⬤⬤⬤
* **Brightness/Value** ranges from 0% (black) to 100% (the actual color): ⬤⬤⬤

To convert your colors from HEX (e.g. `#cc0000`) or RGB (e.g. `rgb(207, 176, 58)`) to HSB/HSV, use a tool like [**colorizer.org**](http://colorizer.org/).

A relative of HSB/HSV is the [HCL](https://en.wikipedia.org/wiki/HCL_color_space) color space. It uses the same parameters (**H**ue, **C**hroma = saturation, **L**ightness), but is closer to "how we really see colors." [**Datawrapper** uses the HCL color space](https://academy.datawrapper.de/article/255-how-to-pick-colors-in-datawrapper) for its color picker:

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1292,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/17a9c7f7f4-1740123117/full-200805_goodcolors31.png)

But since you won't find HCL in Adobe Photoshop or [colorizer.org](http://colorizer.org/), every time I mention degrees (like 0°) or percentages, I'll be talking about the HSB/HSV color space.

All right, let's do this:

#### Broaden your understanding of colors

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1324,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/a4ba552ab0-1740123117/full-200805_goodcolors30.png)

You might think like this: "I need five colors for my chart. So I'll use green and yellow and blue and red. And… um… maybe orange? Or purple!"

If you haven't thought much about colors since you were a kid coloring in your coloring book, this thought makes sense. So today I'm here to tell you: There are more colors than that.

Look at this graphic's colors and compare them with the basic ones ⬤⬤⬤⬤⬤⬤:

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1600,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/5b02e9e627-1740123117/full-200805_goodcolors13-1.png)

They're different. The red that Nadieh uses ⬤ is different from your typical red ⬤. The green ⬤ is... can you even call it a green ⬤?

So before we impose rules that limit us, let me freak you out a bit: There are thousands of colors you can use. There is yellow-ish red ⬤ and blue-ish red ⬤ and everything in between. There is gray ⬤, but there is also cold gray ⬤ and there is warm gray ⬤. And then there is blue. So much blue! Like this ⬤, this ⬤, this ⬤, this ⬤ and this ⬤. And we haven't even talked about orange and yellow.

You have *lots* of choices. Which means you can stay in a small area of the color wheel and still have many options. Which means:

#### Don't dance all over the color wheel

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1324,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/a0b7d702f2-1740123117/full-200805_goodcolors28.png)

There's no need to rely on hues from all around the color wheel like ⬤⬤⬤⬤⬤⬤ for your visualizations. It will look more professional — and therefore more trustworthy — when it only uses a few hues and their neighbors.

Here's where it becomes a good idea to actually look at a color wheel. You can use [Adobe Color](https://color.adobe.com/create/color-wheel) or [Color Calculator](https://www.sessions.edu/color-calculator/) to do so.

![<a href="https://www.sessions.edu/color-calculator/">Color Calculator</a> harmonies](https://datawrapper.de/cdn-cgi/image/quality=85,width=1462,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/ad957b9ce6-1740123117/full-200805_goodcolors21.png)

[Color Calculator](https://www.sessions.edu/color-calculator/) harmonies

Lots of these tools let you choose different harmonies. One of them is called "square" or "tetradic." **Don't use it.** It will result in too many hues — and we're on a mission to avoid that.

[Sorry, your browser doesn't support embedded videos.](https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/bbf4fdc586-1740123117/200805_goodcolors20.mp4)

In the video above, I used the color tool [Paletton](https://paletton.com/) to start with a tetradic harmony and then decrease the distance. Note how much more beautiful the color combinations become.

If the distance becomes small enough, you're basically using **complementary** colors. And that's a great choice! Lots of complementary color pairs look fantastic together. **When in doubt, use complementary colors and their neighbors.**

So let's do this — this time with Adobe Color:

![Our complementary colors in <a href="https://color.adobe.com/create/color-wheel">Adobe Color</a>](https://datawrapper.de/cdn-cgi/image/quality=85,width=1600,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/c23419ac35-1740123117/full-200805_goodcolors22.png)

Our complementary colors in [Adobe Color](https://color.adobe.com/create/color-wheel)

Our colors are opposite each other on the color wheel, so they're clearly complementary. Yay! But they're also unusable: The two oranges are way too similar. And everything looks so… bright.

There's where we need to change the saturation and lightness:

#### Use saturation and lightness to make your hues work

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1324,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/4b93291aa0-1740123117/full-200805_goodcolors27.png)

Saturation and brightness are as important as hue. In fact, you can create new colors when you change just the saturation and brightness. Here are two color pairs with the same hue, just different saturation and lightness: ⬤⬤ / ⬤⬤. (If you change the hue just a tiny bit, you'll achieve even better results: ⬤⬤ / ⬤⬤.)

Let's come back to our color combination: ⬤⬤⬤⬤. After playing around with the saturation and darkness, it becomes this:

![Our better (!) complementary colors in <a href="https://color.adobe.com/create/color-wheel">Adobe Color</a>](https://datawrapper.de/cdn-cgi/image/quality=85,width=1600,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/872098e5d9-1740123117/full-200805_goodcolors23.png)

Our better (!) complementary colors in [Adobe Color](https://color.adobe.com/create/color-wheel)

I desaturated the light blue ⬤ and the lighter orange ⬤ and made every color darker except the lighter orange. Heck yeah, we can work with that!

So if your color combination doesn't look awesome yet, don't immediately add another hue. **Change the saturation and lightness first and see if that's better.**

That's what I did to all of these color palettes: ⬤⬤⬤⬤ and ⬤⬤⬤⬤⬤ and ⬤⬤⬤⬤. They're all roughly complementary, and they all come with different saturations and lightness. That's what makes them work.

#### Use warm colors & blue

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1324,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/378ee699f6-1740123117/full-200805_goodcolors29.png)

There's a complementary color combination that is especially loved by data visualization designers: **yellow/orange/red and blue**. Scroll through graphics portfolios like this one from the [South China Morning Post](https://multimedia.scmp.com/culture/article/SCMP-printed-graphics-memory/) or this one by [The Economist (PDF)](https://infographics.economist.com/2019/AChristmasGiftForYou/AYearInGraphicDetail.pdf), and you'll notice that they use these colors far more often than colors like purple or green.

![<a href="https://multimedia.scmp.com/culture/article/SCMP-printed-graphics-memory/">Three pages by The South China Morning Post</a>](https://datawrapper.de/cdn-cgi/image/quality=85,width=1600,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/917061fd6a-1740123117/full-200805_goodcolors19.png)

[Three pages by The South China Morning Post](https://multimedia.scmp.com/culture/article/SCMP-printed-graphics-memory/)

That's because these warm colors and blue are super versatile for categories. Yellow and orange and red look very pleasing together, but people will still perceive them as different: ⬤⬤⬤ — which is exactly what we want for categorical colors. And blue is more flexible than any other hue. Lots of blues, no matter if dark ⬤ or light ⬤ or saturated ⬤ or not saturated ⬤, look pleasing, calming, and professional.

And they are accessible: colorblind people can easily distinguish blue and orange/red from each other.

So when in doubt, use an orange/red with blue.

#### When using green, make it a yellow or blue one

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1324,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/1e29c90203-1740123117/full-200805_goodcolors26.png)

Forest green covers a full sixth of the color wheel, from approximately 90° ⬤ to 150° ⬤, with 120° as its peak ⬤. However, you will find few well-designed visualizations that use it. Why is that?

First, forest green is just very dark. And lightening the forest green means going into an awkward neon ⬤. So you need to lighten *and* desaturate green enormously — more than other color — to get to a nice one. That’s exactly what the Washington Post does with their green ⬤ here:

![<a href="https://www.washingtonpost.com/graphics/politics/trump-rolling-back-obama-rules/">How Trump is rolling back Obama's legacy</a> in The Washington Post](https://datawrapper.de/cdn-cgi/image/quality=85,width=1600,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/c88791e172-1740123117/full-200805_goodcolors17.png)

[How Trump is rolling back Obama's legacy](https://www.washingtonpost.com/graphics/politics/trump-rolling-back-obama-rules/) in The Washington Post

It's a 142° green, but only 14% saturated. Here’s what the same hue with the same brightness would look like 100% saturated: ⬤. Yikes.

And remember our colorblind friends: A pure green in combination with red, orange, or brown is hard for them to distinguish.

So when using green, make it a bit yellow or a bit blue. You can see this in the examples at the top of this article: All of the greens except FiveThirtyEight's ⬤ have a hue greater than 160° (= bluer) ⬤⬤⬤ or less than 60° (= more yellow) ⬤⬤. Nadieh uses both yellow-green and blue-green in this project we've already seen:

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1600,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/dd18af05f7-1740123117/full-200805_goodcolors13-2.png)

Looks like you can use them in your visualization as two different colors, as Nadieh does: Win-win!

#### Avoid pure colors

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1324,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/b72828805f-1740123117/full-200805_goodcolors5.png)

"Pure" hues are the ones that are located at exactly 60°, 120°, 180°, 240°, 300°, or 360°/0° in the color wheel:

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1324,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/0a6771f635-1740123117/full-200805_goodcolors7.png)

Here's an example: In HSV/HSB, the **H**ue value of this bright blue ⬤ is 180°, the **S**aturation value is 67%, and the **L**ightness value is 91%. You can also check the RGB values of your color: If at least two of the values are the same, they're "pure". For example, our ⬤ is a `rgb(77, 232, 232)`.

To make your colors look more natural and pleasing to your readers' eyes, you can either tone down the saturation of pure colors or make them darker. **If you want to have bright, saturated colors, rely on mixed colors** at least 5-10° away from the pure hues.

In the image above, the red and orange, the blues and the greens have the same saturation and lightness. The only difference is the hue: The red ⬤ (0°), blue ⬤ (240°), and green ⬤ (120°) look more colorful than the orange ⬤ (40°), medium blue ⬤ (211°), and blue-ish green ⬤ (170°).

#### Avoid bright, saturated colors

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1324,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/176b0860e5-1740123117/full-200805_goodcolors4.png)

Neon colors will definitely attract the attention of readers. But these readers won't thank you. Most of us get a bit stressed out when we see them: "Highly saturated, light colors will NOT be appropriate [to communicate] Serious or Trust, or Calm," researchers Bartram, Patra, and Stone explain in their paper "Affective Color in Visualization" from 2017 ([PDF](https://research.tableau.com/sites/default/files/Affective%20Color%20CHI%202017.pdf)).

If your colors come close to 100% saturation **and** 100% brightness, it's likely your colors are too colorful. That's definitely the case for pure colors like ⬤⬤⬤⬤.

"But I've seen such crazy colors before, and they look good," you might say, and refer to projects like these:

![<a href="https://www.nytimes.com/interactive/2019/08/19/us/politics/presidential-campaign-songs-playlists.html">New York Times article</a> on music playlists](https://datawrapper.de/cdn-cgi/image/quality=85,width=1600,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/2691c75a4c-1740123117/full-200805_goodcolors3-1.png)

[New York Times article](https://www.nytimes.com/interactive/2019/08/19/us/politics/presidential-campaign-songs-playlists.html) on music playlists

![<a href="https://www.bloomberg.com./graphics/2020-us-bankruptcies-coronavirus/?srnd=graphics-v2">Bloomberg article</a> on bankruptcies](https://datawrapper.de/cdn-cgi/image/quality=85,width=1600,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/67d240c5f7-1740123117/full-200805_goodcolors2.png)

[Bloomberg article](https://www.bloomberg.com./graphics/2020-us-bankruptcies-coronavirus/?srnd=graphics-v2) on bankruptcies

![<a href="https://pudding.cool/2018/09/wiki-billboard/">The Pudding article</a> on celebrities](https://datawrapper.de/cdn-cgi/image/quality=85,width=1600,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/a2bb2f1796-1740123117/full-200805_goodcolors1.png)

[The Pudding article](https://pudding.cool/2018/09/wiki-billboard/) on celebrities

But if you compare the colors from these examples with colors like ⬤⬤⬤⬤, you see how the former ones are all less saturated or darker. A 100% saturated and 100% bright green ⬤ becomes less saturated in the New York Times ⬤, and less saturated *and* darker in both the Bloomberg article ⬤ and the Pudding article ⬤.

They have the same fun, attention-grabbing effect as neon colors have, while being easier on the eye.

This works more or less because the people at The Pudding, The New York Times, and Bloomberg are great designers. **When in doubt, avoid 100% saturation combined with 100% lightness.**

#### Combine colors with different lightness

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1324,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/01d1622af9-1740123117/full-200805_goodcolors11.png)

I sometimes see charts — especially area charts — where neighboring elements have the same lightness. You can easily check this: Just convert your colors to black & white (e.g., with an external colorblindness simulator or with our [Datawrapper colorblind check](https://twitter.com/Datawrapper/status/1298293123584536578)). If they all have the same gray, they're the same lightness.

For example, the ⬤⬤⬤ from the far left chart look like ⬤⬤⬤ in grayscale.

To avoid that dull and eye-hurting experience, you have two options:

* "Get it right in black & white": change the darkness of each area, making some brighter and some darker, like so: ⬤⬤⬤. They look like this in grayscale: ⬤⬤⬤
* Separate the areas, e.g., with a white border

I highly recommend the first option (you can still put a white border around it if you like the style): The colors will look more dynamic, and colorblind people will thank you. Actually, everyone will thank you, regardless of their color-seeing abilities.

In fact, a valid way to pick colors for categorical data is to pick colors from gradients like these ones:

![<a href="https://bids.github.io/colormap/">Viridis</a> color schemes](https://datawrapper.de/cdn-cgi/image/quality=85,width=1289,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/87431d696b-1740123117/full-200630_colorblind3.png)

[Viridis](https://bids.github.io/colormap/) color schemes

All these gradients move smoothly from light to dark, so colors you pick from there will all have a different lightness: ⬤⬤⬤⬤⬤ or ⬤⬤⬤⬤⬤. Try this [Color Palette Generator](https://learnui.design/tools/data-color-picker.html) if you're a fan of that approach.

#### Make your colors similarly "colorful"

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1324,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/f0ff781b4a-1740123117/full-200805_goodcolors32.png)

In your visualizations, you often want colors to stand out. There are different ways to achieve that. Colors stand out:

* because they're way darker ⬤⬤
* because they're way lighter ⬤⬤
* because they're more saturated ⬤⬤
* because they're more "pure" ⬤⬤

But you usually just want one or two colors to stand out. Most of your colors are supposed to be **more or less equally attention-grabbing**.

If you're using colors with different lightness ("Get it right in black & white"), you'll need to balance them out. **Try to desaturate bright colors. Put more saturation in dark colors.**

Or choose a less pure hue: in the image above, the green ⬤ and blue ⬤ are very pure, so I darkened them. (Here's how they look with 100% brightness: ⬤⬤.)

I then wanted to bring a red in... but the bright red would have been too intense as a pure hue (at 0°) ⬤⬤⬤. So I had two options:

1. simply darken it: ⬤⬤⬤.
2. move the hue (and just the hue) to 30° to make it more orange ⬤⬤⬤.

I chose the second option to make it look a bit more friendly. But both options work.

#### Avoid too little contrast with the background

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1324,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/f8570d1774-1740123117/full-200805_goodcolors8.png)

A surprising number of charts on bright backgrounds use very pastel-ish colors. They're often not very saturated, and awfully light.

That comes with problems: If you work with small areas like lines and dots, light and desaturated colors can be hard for your readers to distinguish. But even if legibility is not an issue — e.g. for bigger areas — your visualizations should have enough visual contrast with the background to confidently communicate: "Hey, I'm here, and I have something to say."

Here's what to do when your colors are too desaturated and light ⬤⬤⬤:

* Increase the saturation: ⬤⬤⬤
* Make them darker: ⬤⬤⬤
* Or do both for the best result: ⬤⬤⬤

Of course, that's also a matter of taste. But if you're not sure if your colors are too pastel-ish, simply try to make them more saturated and darker. Just see how it feels. And if it feels good, keep it.

#### Avoid too much contrast with the background

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1324,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/587cd73c27-1740123117/full-200805_goodcolors9.png)

The opposite is true, too: Don't make your colors too dark and saturated when you're using a bright background. If in doubt, try it out. Make your colors lighter, pull some saturation out of them and see how it feels.

#### Choose a background that's desaturated enough

![](https://datawrapper.de/cdn-cgi/image/quality=85,width=1324,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/da40b21016-1740123117/full-200805_goodcolors10-1.png)

Once you become more confident with colors, colorful backgrounds can seem like a good idea. But they come with two big drawbacks: First, they easily distract from your data. Second, they're limiting your potential color palette and are therefore hard to work with. In fact, the more saturated your background, the harder it gets — so desaturated colors are your best bet. Here are some rules of thumbs for the HSB/HSV color space:

* If you want a light background, stay away from colors below 95% lightness and above 7% saturation.
* If you want a dark background, stay below 20% saturation. Also, [don't go full black](https://ianstormtaylor.com/design-tip-never-use-black/) — keep your lightness between 10% and 25%.

#### Copy colors, or understand them

Picking good colors is hard. It's totally ok to be bad with colors, to keep being bad with colors, and to just copy colors. Seriously, there's no shame in stealing. [**I wrote a whole article**](/blog/colorguide/) about where to get inspiration for colors: From movies, artists, color palettes others have created, etc. (And may I add: Other data visualizations are an excellent source.)

If you do want to build a better intuitive understanding of which colors fit well together, try this: Analyze them. Some ways to do that include:

![Photo by <a href="https://unsplash.com/@niko_photos">niko photos</a> on <a href="https://unsplash.com/s/photos/tree">Unsplash</a>](https://datawrapper.de/cdn-cgi/image/quality=85,width=1600,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/beautifulcolors/e5da4d22c0-1740123117/full-200805_goodcolors24-1.jpg)

Photo by [niko photos](https://unsplash.com/@niko_photos) on [Unsplash](https://unsplash.com/s/photos/tree)

* Select a picture with colors you consider beautiful, like an art piece or photo of nature. Then pick colors out of them with an eyedropper tool, e.g., in Photoshop or [**image-color.com**](https://image-color.com/). Try to use them in your next chart.
* Install [**Adobe Capture**](https://www.adobe.com/products/capture.html), which is the same idea but for "live images": It lets you capture colors from your environment. (It's fascinating to see how desaturated many colors are around us!)
* Play "manual color picker": **Look up your screen. Which colors do you see?** How dark and how saturated are there? Which hues are close by; which ones are opposite on the color wheel?
* Pick colors from beautiful data visualizations. **Change a few colors.** Do they still work well together?

Also, the next time you're creating a data visualization and you're not happy with your colors, **analyze them in the HSV/HSB color space**, e.g., with [colorizer.org](http://colorizer.org/):

* How **saturated** are they — and do they look better if you increase or decrease the saturation by a few (or a lot of) percentage points?
* Which **hue** value do they have? What happens if you change the hue by just a few degrees?
* Are your colors differently **bright**?

With time, your understanding will move from "that's beautiful, but I don't know why" to "that's beautiful, because…" And you'll find that you can break more and more of these rules I explained here — and still create great color combinations.

---

*I hope this article was helpful! If you want to continue reading: There are quite some articles on this blog about color, e.g. about [colors for gender](/blog/gendercolor/), [colors for political parties](/blog/partycolors/), colorblindness ([part 1](/blog/colorblindness-part1/), [2](/blog/colorblindness-part2/), [3](/blog/colorblindness-part3/)), and [what to consider in general when using colors](/blog/colors/) in your visualizations. If there's a great trick this article is missing, let me know at [lisa@datawrapper.de](mailto:lisa@datawrapper.de) or in the comments below.*

![Portrait of Lisa Charlotte Muth](https://datawrapper.de/cdn-cgi/image/quality=85,width=1000,height=999,f=auto,fit=cover/https://kirby.datawrapper.de/media/users/i4kiysNg/13f8939ae0-1740408933/profile.webp)

**Lisa Charlotte Muth** (she/her, @lisacmuth, @lisacmuth@vis.social) is Datawrapper’s head of communications. She writes about best practices in data visualization and thinks of new ways to excite you about charts and maps. Lisa lives in Berlin.

**Liked this article?** Maybe your friends will too:

[LinkedIn](https://www.linkedin.com/sharing/share-offsite/?url=https://www.datawrapper.de/blog/beautifulcolors)  [Bluesky](https://bsky.app/intent/compose?text=https://www.datawrapper.de/blog/beautifulcolors)

Comments
--------

Newsletter
----------

[Sign up to our newsletters](/blog/newsletter) to get notified about everything new on
our blog.

Related Posts
-------------

[![How to find & create good color palettes](https://datawrapper.de/cdn-cgi/image/quality=85,width=320,height=160,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/create-good-color-palettes/5120443c90-1740123235/header-image2.png)](/blog/create-good-color-palettes)

[### How to find & create good color palettes](/blog/create-good-color-palettes)

December 11th, 2024 by Lisa Charlotte Muth

[![What to consider when choosing colors for race, ethnicity, and world regions](https://datawrapper.de/cdn-cgi/image/quality=85,width=320,height=160,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/colors-for-race-ethnicity-world-regions/f7c4951c6a-1740123230/colorblind-f2_1.png)](/blog/colors-for-race-ethnicity-world-regions)

[### What to consider when choosing colors for race, ethnicity, and world regions](/blog/colors-for-race-ethnicity-world-regions)

October 9th, 2024 by Lisa Charlotte Muth

[![Remind readers of the colors in your data visualization](https://datawrapper.de/cdn-cgi/image/quality=85,width=320,height=160,f=auto,fit=cover/https://kirby.datawrapper.de/media/pages/blog/remind-readers-of-colors-in-data-vis/0bdacb90d6-1740123199/colorkey-feature-image.png)](/blog/remind-readers-of-colors-in-data-vis)

[### Remind readers of the colors in your data visualization](/blog/remind-readers-of-colors-in-data-vis)

October 11th, 2023 by Lisa Charlotte Muth

All Blog Categories
-------------------

[Climate vis](/blog/category/climate-data-vis)[Color book updates](/blog/category/color-book)[Color in data vis](/blog/category/color-in-data-vis)[Covid vis](/blog/category/covid-data-vis)[Data Vis Book Club](/blog/category/book-club)[Data Vis Dispatch](/blog/category/data-vis-dispatch)[Data vis do’s & don’ts](/blog/category/datavis-dos-and-donts)[Datawrapper News](/blog/category/datawrapper-news)[Fix my chart](/blog/category/fix-my-chart)[How to deal with data](/blog/category/how-to-deal-with-data)[Map Stories](/blog/category/map-stories)[Maps](/blog/category/maps)[Opinions](/blog/category/opinions)[Team news and hiring](/blog/category/team-news)[Uncategorized](/blog/category/uncategorized)[Under the hood](/blog/category/under-the-hood)[Unwrapped](/blog/category/unwrapped)[User stories](/blog/category/how-others-use-us)[Weekly Charts](/blog/category/weekly-charts)

[View a chronological list of our articles](/blog/posts/) [Learn more about our newsletters](/blog/newsletter/)

* Datawrapper logo

  + [Get Support](/contact/support)
  + [Contact Us](/contact)
* Product

  + [Charts](/charts)
  + [Maps](/maps)
  + [Tables](/tables)
  + [Pricing](/pricing)
  + [Case Studies](/case-studies)
* Features

  + [All Features](/features)
  + [Custom Themes](/custom-themes)
  + [Dark Mode](/dark-mode)
  + [Print Export](/print-export)
  + [Localization](/localization)
  + [Teams](/teams)
  + [Accessibility](/accessibility)
  + [Privacy](/embed-privacy)
  + [Security](/security)
  + [PowerPoint Integration](/powerpoint-integration)
* Resources

  + [Blog](/blog)
  + [Academy](https://www.datawrapper.de/academy)
  + [River](https://river.datawrapper.de)
  + [Webinars](/webinars)
  + [Training Materials](/training-materials)
  + [API Docs](https://developer.datawrapper.de/docs/getting-started)
* Company

  + [About Us](/about-us)
  + [Latest Improvements](/changelog)
  + [Careers](/careers)
  + [Privacy Policy](/privacy)
  + Cookie Preferences
  + [Terms of Service](/terms)
  + [Imprint](/imprint)

© 2026 Datawrapper is developed by [Datawrapper GmbH](https://datawrapper.de/imprint)