# Home Canvas

# Build a 10× Better Premium Home Decor E-Commerce Website

## ROLE

You are a senior UI/UX designer, creative director, motion designer, and frontend engineer specializing in premium D2C e-commerce websites.

Build a highly polished, visually immersive, conversion-focused home decor e-commerce website inspired by the visual storytelling and product presentation style of modern premium Indian home-interior brands such as Story@Home.

IMPORTANT:

Do NOT copy Story@Home's exact design, layout, assets, text, branding, or code.

Use the general concept of:

* visual storytelling
* large editorial imagery
* premium product presentation
* category discovery
* product carousels
* smooth transitions
* image-led navigation
* scroll-based animations
* immersive sections

Then improve the experience significantly with a more sophisticated, modern, editorial and cinematic design.

The final result should look like a website created by a top-tier design agency, not a generic Shopify template.

---

# 1. BRAND POSITIONING

Create a premium Indian home lifestyle brand.

Brand personality:

* Elegant
* Modern
* Warm
* Sophisticated
* Artistic
* Minimal
* Aspirational
* Comfortable
* Premium but approachable
* Contemporary Indian

The website should communicate:

"Transform your everyday home into a space that feels beautifully yours."

Avoid:

* Cheap-looking gradients
* Excessive rounded cards
* Generic SaaS UI
* Excessive shadows
* Random animations
* Overcrowded layouts
* Too many colors
* Stock-template appearance
* Excessive text
* Cartoonish icons

---

# 2. VISUAL DIRECTION

Create an editorial luxury aesthetic.

Use:

* Warm ivory / off-white background
* Deep charcoal text
* Soft beige
* Muted earthy tones
* Terracotta accents where appropriate
* Natural photography
* Large high-resolution interior photography
* Strong typography hierarchy
* Generous whitespace
* Asymmetric layouts
* Full-width photography
* Large typography
* Subtle borders
* Minimal shadows

The design should feel somewhere between:

Luxury interior magazine
+
Modern Indian lifestyle brand
+
Premium fashion e-commerce
+
Architectural editorial website

Do not make every section look like a rectangular card.

Use different visual compositions throughout the page.

---

# 3. TYPOGRAPHY

Use a premium typography pairing.

Recommended:

Primary sans-serif:

* Inter
  or
* Manrope
  or
* Neue-style modern sans-serif equivalent

Display/editorial font:

* Playfair Display
  or
* Cormorant Garamond
  or another sophisticated serif

Use serif typography selectively for emotional/editorial statements.

Example:

"Make room for
beautiful living."

The word "beautiful" can use the serif font.

Typography must be responsive.

Desktop:

* Hero heading: 72–110px
* Major section heading: 48–72px
* Product titles: 15–18px
* Body: 15–17px

Tablet/mobile:
Scale typography naturally using clamp().

---

# 4. GLOBAL HEADER

Create a premium sticky navigation.

Desktop structure:

LEFT:
Logo

CENTER:

* New Arrivals
* Bed & Bath
* Curtains
* Living
* Decor
* Collections

RIGHT:

* Search icon
* Account icon
* Wishlist icon
* Shopping bag icon

Header behavior:

Initial state:
Transparent over hero image.

When scrolling:

* Background becomes slightly opaque
* Backdrop blur
* Text changes appropriately
* Header height subtly decreases
* Smooth transition

Do NOT abruptly change the header.

Animation duration:
300–500ms.

Mobile:

LEFT:
Hamburger

CENTER:
Logo

RIGHT:
Search + bag

Mobile menu:

* Full-screen or large side drawer
* Smooth slide-in
* Background lock
* Staggered menu item animation
* Close animation

---

# 5. HERO SECTION

Make the hero the strongest visual section.

Full viewport:

min-height:
90vh–100vh

Use a large lifestyle interior image or high-quality image/video.

Hero composition:

FULL-BLEED IMAGE

Overlay subtle dark/gradient treatment only where required for readability.

Text should be positioned elegantly, not simply centered like a template.

Example:

SMALL LABEL:
THE NEW HOME EDIT

MAIN TITLE:

"Spaces that
feel like you."

Supporting text:

Thoughtfully designed home essentials that bring comfort, character and beauty into everyday living.

CTA:

EXPLORE COLLECTION

Secondary CTA:

SHOP NEW ARRIVALS

---

# 6. HERO ANIMATION

Create cinematic entrance animation.

On page load:

1. Hero image starts slightly zoomed:
   scale(1.08)

2. Image smoothly transitions to:
   scale(1)

3. Hero heading:
   opacity 0 → 1
   translateY(40px) → 0

4. Supporting text:
   opacity 0 → 1
   translateY(25px) → 0

5. CTA:
   opacity 0 → 1
   translateY(20px) → 0

Use staggered timing.

Suggested timing:

Image:
1.2s

Heading:
0.8s

Paragraph:
0.6s

CTA:
0.5s

Use:
cubic-bezier(0.22, 1, 0.36, 1)

Do NOT make the animations too fast.

---

# 7. HERO IMAGE PARALLAX

As the user scrolls:

Hero image should subtly move vertically.

Text should move at a slightly different speed.

Use a very subtle parallax effect.

Do not overdo it.

The effect should feel expensive, not like a PowerPoint presentation trying desperately to become interactive.

---

# 8. SHOP BY CATEGORY

After hero, create an immersive category discovery section.

Heading:

"Everything your home needs."

Subheading:

From everyday essentials to statement pieces.

Create large image-led category blocks.

Categories:

* Bed Linen
* Curtains
* Cushion Covers
* Rugs
* Bath
* Furniture
* Wall Decor
* Home Accessories

Instead of identical cards, create an editorial masonry layout.

Example:

Large image:
Bed Linen

Medium:
Curtains

Small:
Bath

Large:
Living

Each category should contain:

Image
Category name
Short description
Arrow icon

---

# 9. CATEGORY HOVER EFFECT

Desktop hover:

Image scale:
1 → 1.06

Overlay:
subtle darkening

Text:
translateY(8px) → 0

Arrow:
translateX(0) → 8px

Image transition:
700–900ms

Use smooth easing.

Do NOT use aggressive zooming.

On mobile:
Disable hover and use touch-friendly interaction.

---

# 10. EDITORIAL IMAGE REVEALS

Every major image section should have a subtle reveal animation.

When entering viewport:

Image container:
clip-path inset(0 0 100% 0)

Then animate to:

clip-path inset(0 0 0 0)

At the same time:
image scale 1.08 → 1

This creates an editorial magazine-style image reveal.

Use Intersection Observer or Framer Motion.

Do not trigger every animation immediately on page load.

---

# 11. "SHOP THE LOOK" SECTION

Create a visually immersive room scene.

Use one large interior photograph.

Place interactive product hotspots on the image.

Example:

• Cushion
• Curtain
• Rug
• Bedsheet
• Lamp

Hotspots should be small elegant circles.

On hover/click:

Show product mini-card containing:

Product image
Product name
Price
"View Product"

Animation:
fade + scale

Desktop:
Interactive image.

Mobile:
Convert hotspots into a horizontally scrollable product list below the image.

---

# 12. NEW ARRIVALS

Create a horizontal product carousel.

Heading:

"New to the home."

Subheading:

Fresh textures, patterns and pieces for the season.

Product card:

Large image
Product name
Category
Price
MRP
Discount
Wishlist icon

Card width:
Desktop approximately 280–340px.

Use horizontal scrolling.

Navigation:
Left arrow
Right arrow

Also support:
mouse drag
touch swipe
keyboard navigation

Do NOT use a huge number of products at once.

---

# 13. PRODUCT IMAGE HOVER

Each product should support multiple images.

Default:

Image 1

On hover:

Smoothly transition to Image 2.

Do NOT abruptly replace the image.

Use crossfade or opacity transition.

Optional:

Very subtle zoom.

---

# 14. PRODUCT CARD MICRO-INTERACTIONS

Wishlist icon:

Default:
outline heart

Hover:
small scale animation

Click:
filled state

Add-to-cart:

When clicked:

Button text:
"Add to cart"

Then:
"Added ✓"

Animate product thumbnail toward the shopping bag icon if practical.

Do not create annoying bouncing animations.

---

# 15. BESTSELLERS SECTION

Create a different visual treatment from New Arrivals.

Instead of another identical carousel, create:

LEFT:
Large featured product

RIGHT:
Vertical list of 4 bestselling products

Featured product should occupy approximately 50–55% width.

Use image transition when selecting different products.

When user clicks another product:

Main image:
crossfade

Product information:
fade + slide

This creates an interactive editorial shopping experience.

---

# 16. PATTERN DISCOVERY SECTION

Create an immersive "Explore Patterns" section.

Categories:

* Floral
* Geometric
* Abstract
* Botanical
* Stripes
* Solid
* Artistic
* Traditional

Use large image tiles.

When hovering:

Image slowly zooms

Pattern name moves upward

"Explore" appears

Add a subtle cursor-following effect if it feels natural.

Avoid excessive effects.

---

# 17. SCROLLING MARQUEE

Add a premium horizontal text marquee.

Example:

BED LINEN • CURTAINS • CUSHIONS • RUGS • DECOR • BATH • FURNITURE

The marquee should move continuously.

Speed:
slow and elegant.

Pause on hover.

On mobile:
reduce speed.

---

# 18. FULL-WIDTH BRAND STATEMENT

Create a minimal section with lots of whitespace.

Example:

"Your home isn't just
where you live.

It's where life happens."

Use large typography.

Animate each line as it enters viewport.

Animation:
opacity + translateY

Keep this section visually quiet.

---

# 19. STORY / BRAND SECTION

Create a premium split-screen section.

LEFT:
Large lifestyle image

RIGHT:
Brand story

Heading:

"Designed for the way
you live."

Text:

Tell a concise story about craftsmanship, comfort, materials and thoughtful design.

CTA:
OUR STORY

Image should have subtle parallax.

---

# 20. SUSTAINABILITY SECTION

Create a sophisticated sustainability section.

Use:

Large editorial image
+
minimal statistics.

Example:

BETTER MATERIALS

Thoughtfully selected fabrics and materials designed for everyday comfort.

Then 3 statistics:

01
Responsible sourcing

02
Thoughtful production

03
Long-lasting design

Use animated counters only when appropriate.

---

# 21. TESTIMONIALS

Create an elegant testimonial section.

Instead of normal cards:

Large quote typography.

Example:

"Beautiful fabrics, beautiful finish, and it completely changed the room."

Customer name

Location

Use a subtle horizontal slider.

Transition:
crossfade + slight horizontal movement.

Do not auto-scroll too quickly.

---

# 22. INSTAGRAM / SOCIAL VISUAL GRID

Create a visual social section.

Heading:

"Life at home."

Use 6–8 image tiles.

Grid should have varied dimensions.

Hover:

Image scale
Overlay
Instagram icon
"View"

On mobile:
2-column grid.

---

# 23. BLOG / JOURNAL

Create editorial blog section.

Heading:

"The Journal"

Articles:

* How to choose curtains for your room
* 7 ways to refresh your bedroom
* How to mix patterns
* Creating a calm living space
* Choosing the right bedsheet fabric

Each article:

Large image
Category
Title
Reading time
Arrow

Hover animation:
Image zoom
Arrow movement

---

# 24. NEWSLETTER SECTION

Create a visually minimal newsletter area.

Heading:

"Make your inbox
a little more beautiful."

Input:
Your email address

Button:
JOIN THE LIST

Supporting text:

New collections, design inspiration and occasional offers.

Do not make it look like a generic SaaS newsletter.

---

# 25. FOOTER

Create a premium large footer.

Columns:

SHOP

* Bed Linen
* Curtains
* Cushions
* Rugs
* Bath
* Decor

ABOUT

* Our Story
* Sustainability
* Journal
* Contact

HELP

* Shipping
* Returns
* FAQs
* Track Order

FOLLOW

* Instagram
* Facebook
* Pinterest

Bottom:

Copyright
Privacy
Terms
Shipping policy

Add a large oversized brand logo/text above the bottom footer.

---

# 26. PAGE TRANSITIONS

Implement smooth page transitions.

When navigating:

Current page:
fade + slight upward movement

New page:
fade in + upward reveal

Keep transition approximately:
400–700ms.

Do not make navigation feel slow.

---

# 27. SCROLL BEHAVIOR

Use smooth scrolling where appropriate.

Implement:

* Intersection Observer
* Framer Motion / Motion
* CSS transforms
* opacity transitions
* clip-path reveals
* subtle parallax
* horizontal scroll sections

IMPORTANT:

Animations must respect:

prefers-reduced-motion

If the user has reduced motion enabled:
disable parallax and excessive transitions.

---

# 28. ANIMATION SYSTEM

Create a consistent animation language.

Use only a few core animations:

1. Fade Up
2. Image Reveal
3. Image Scale
4. Horizontal Slide
5. Crossfade
6. Subtle Parallax
7. Hover Lift
8. Clip Reveal

Do not invent a different animation for every section.

Animation principles:

* Smooth
* Slow enough to feel premium
* Responsive
* Purposeful
* Never distracting

Typical durations:

Micro interaction:
200–300ms

Button:
250–350ms

Card:
400–600ms

Image:
700–1000ms

Hero:
1000–1500ms

---

# 29. CUSTOM CURSOR

Desktop only.

Create a very subtle custom cursor.

Normal:
small circle

Interactive element:
circle expands slightly

Image:
cursor displays "VIEW"

Product:
cursor displays "SHOP"

Do NOT use this on mobile.

Disable on touch devices.

---

# 30. IMAGE STRATEGY

Use high-quality lifestyle photography.

Images should show:

* Modern Indian homes
* Bedrooms
* Living rooms
* Dining areas
* Curtains
* Textiles
* Close-up fabric textures
* Natural sunlight
* Warm interiors
* Contemporary architecture

Image hierarchy:

Hero:
cinematic full-width image

Categories:
editorial lifestyle images

Products:
clean product photography

Story:
emotional lifestyle photography

Patterns:
close-up texture photography

Never stretch images.

Use:
object-fit: cover

Use lazy loading for below-the-fold images.

Use responsive image sizes.

Use WebP/AVIF where possible.

---

# 31. RESPONSIVE DESIGN

The website must be genuinely responsive.

Desktop:
1440px+

Tablet:
768–1199px

Mobile:
320–767px

Do not simply shrink the desktop design.

Mobile must be redesigned intelligently.

Mobile priorities:

* Fast loading
* Large imagery
* Easy navigation
* Swipeable carousels
* Large touch targets
* Minimal text
* Sticky shopping actions where appropriate

---

# 32. MOBILE HERO

Hero should use:

height:
75–90vh

Text positioned near bottom.

CTA should be full-width or large enough for touch.

Disable excessive parallax.

Hero animation should remain smooth.

---

# 33. MOBILE CATEGORY EXPERIENCE

Instead of complex masonry:

Use horizontal scrolling category cards.

Each card:
approximately 75vw wide.

Allow:
touch swipe

Hide unnecessary navigation arrows.

---

# 34. ACCESSIBILITY

Implement:

* Semantic HTML
* Proper heading hierarchy
* Alt text
* Keyboard navigation
* Visible focus states
* ARIA labels
* Accessible buttons
* Minimum touch target ~44px
* Good color contrast
* Reduced-motion support

Never sacrifice accessibility for visual effects.

---

# 35. PERFORMANCE

This is extremely important.

Do not create a beautiful website that loads like a government portal from 2007.

Optimize:

* Image loading
* Lazy loading
* Code splitting
* Animation performance
* GPU-friendly transforms
* Avoid unnecessary JavaScript
* Avoid layout thrashing
* Use transform/opacity for animations
* Preload only critical hero assets
* Use responsive images

Target:

Lighthouse Performance:
90+

Accessibility:
90+

Best Practices:
90+

SEO:
90+

---

# 36. TECH STACK

Use:

React
+
Next.js if appropriate
+
Tailwind CSS
+
Framer Motion / Motion
+
Lucide Icons

Use TypeScript.

Component architecture should be clean and reusable.

Suggested structure:

/components
Header
MobileMenu
Hero
CategoryGrid
ProductCarousel
ProductCard
FeaturedProduct
PatternSection
ShopTheLook
BrandStory
Sustainability
Testimonials
InstagramGrid
Journal
Newsletter
Footer

/pages or app routes:
/
/shop
/collections
/product/[slug]
/category/[slug]
/about
/journal
/contact
/cart

---

# 37. DATA ARCHITECTURE

Do NOT hardcode product UI repeatedly.

Create reusable product data.

Example:

{
id,
name,
category,
price,
mrp,
discount,
images: [],
rating,
reviews,
badge
}

Create reusable components:

<ProductCard />

<ProductCarousel />

<CategoryCard />

<EditorialSection />

---

# 38. PRODUCT DETAIL PAGE

Create a premium product detail page.

Desktop:

LEFT:
Large image gallery

RIGHT:
Product information

Include:

Product name
Rating
Reviews
Price
MRP
Discount
Color
Size
Quantity
Add to Cart
Buy Now
Wishlist

Below:

Product description
Details
Material
Care instructions
Shipping
Returns

Then:

"Complete the look"

Related products carousel.

---

# 39. PRODUCT IMAGE GALLERY

Desktop:

Large primary image

Vertical thumbnails on left.

Click thumbnail:
smooth crossfade.

Hover:
subtle zoom.

Mobile:
horizontal swipe gallery.

Show:
1/5
2/5
etc.

---

# 40. SHOPPING CART

Create a clean cart drawer.

When clicking bag:

Slide drawer from right.

Background:
subtle dark overlay.

Cart item:
image
name
quantity controls
price
remove

Bottom:

Subtotal

"Checkout"

Continue Shopping

Drawer animation:
350–500ms.

---

# 41. SEARCH EXPERIENCE

Create an immersive search overlay.

Click search:

Search panel expands.

Input:
"What are you looking for?"

Below:

Trending searches:

* Curtains
* Floral
* Bedsheets
* Cushions
* Rugs

Live results should appear while typing.

Results:
image
name
price

Use debounce for search.

---

# 42. MICRO-INTERACTIONS

Add subtle details throughout:

Buttons:
arrow movement

Links:
underline reveal

Images:
small scale

Cards:
tiny elevation

Wishlist:
heart animation

Cart:
bag counter update

Search:
smooth expansion

Menu:
staggered entrance

These details should make the site feel polished without becoming distracting.

---

# 43. EMPTY STATES

Create beautiful empty states.

Wishlist empty:

"Nothing here yet."

Cart empty:

"Your space is waiting for something beautiful."

Search empty:

"We couldn't find that."

Include relevant CTA.

---

# 44. ERROR STATES

Create friendly error pages.

404:

"Looks like this room doesn't exist."

CTA:
BACK TO HOME

Keep it elegant and brand appropriate.

---

# 45. SEO

Implement:

* Proper title tags
* Meta descriptions
* Open Graph
* Structured data
* Product schema
* Breadcrumb schema
* Semantic URLs
* Image alt text
* Canonical URLs
* Sitemap
* Robots.txt

---

# 46. FINAL VISUAL QUALITY

The final website must NOT feel like:

* Generic Shopify
* Generic React template
* AI-generated landing page
* Dashboard
* SaaS website
* Collection of random cards

It should feel like:

A premium interior-design editorial website that happens to be extremely good at e-commerce.

The user should immediately notice:

1. Beautiful photography
2. Excellent typography
3. Smooth motion
4. Strong visual hierarchy
5. Premium whitespace
6. Easy shopping
7. High-quality product presentation
8. Sophisticated interactions

---

# 47. IMPORTANT ANIMATION RULE

Do NOT animate everything.

Approximately:

Hero:
high animation

Category:
medium

Products:
subtle

Editorial:
medium

Brand story:
medium

Footer:
minimal

The animation should guide attention, not compete with the products.

---

# 48. FINAL EXPERIENCE

The complete experience should feel like the user is moving through a digital interior-design magazine.

Flow:

HERO
↓
DISCOVER CATEGORIES
↓
NEW COLLECTION
↓
SHOP THE LOOK
↓
BESTSELLERS
↓
PATTERN DISCOVERY
↓
BRAND STORY
↓
SUSTAINABILITY
↓
TESTIMONIALS
↓
JOURNAL
↓
INSTAGRAM
↓
NEWSLETTER
↓
FOOTER

Every section should visually transition naturally into the next.

Avoid abrupt section changes.

---

# 49. DEVELOPMENT REQUIREMENT

Before finishing:

* Test desktop
* Test tablet
* Test mobile
* Test keyboard navigation
* Test reduced motion
* Test slow network
* Test image loading
* Test product carousel
* Test navigation
* Test mobile menu
* Test cart drawer
* Test search
* Test hover states
* Test touch interactions

Remove:

* console errors
* broken images
* layout shifts
* overflow bugs
* horizontal scrolling bugs
* animation glitches

---

# 50. MOST IMPORTANT DESIGN PRINCIPLE

Do not merely reproduce the reference website.

Take the underlying idea of visual storytelling and premium e-commerce and evolve it.

The result should feel:

"Story@Home's visual storytelling, but redesigned by a world-class luxury digital studio in 2026."

Prioritize:

DESIGN > DECORATION

MOTION > STATIC UI

STORYTELLING > REPETITION

PRODUCT DISCOVERY > CLUTTER

QUALITY > QUANTITY

SUBTLETY > EXCESS

The final website must look exceptionally polished, premium, modern, responsive and production-ready.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7cdf80b6-1dc3-41e6-bde7-bf2e14f57a70).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
