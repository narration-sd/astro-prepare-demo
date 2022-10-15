# astroblog-beta-prepare

## Basis
This begins in a fork of the stock astro blog starter, in its state about 3 months ago

## Content

As of 14 October 2022, we have a back-room demonstrator of Astro with Pinia, Pug, and Vuetify operating, 
all at SPA speed via a working arrangement of Turbo.

The key to this is a method of reflecting the Vue app root back to the Astro 
client side code, which is contained in a matching fork of Astro 1.4.4.

The method is suitable for similar extensions on other framerwork integrations. 
However, an even solider approach appears to have turned up just now, 
via @natemoo-re 's patch employing an overlooked Vite feature,
[Virtual Modules](https://vitejs.dev/guide/api-plugin.html#virtual-modules-convention).

Virtual Modules appears to do much as was accomplished here, but in a visibly
supported feature, which will thus stay reliable.

## The Prepare system: Astro`Vue.use()`capability, and adding packages

Prepare has been the name for the concept here, and useful insight can be gained 
from what's found in the /prepare/vue-prepare.mjs file and the modules it uses.

Promises are openly used throughout, out of initially critical use of dynamic
imports. Those are no longer needed on this side of the Astro divide, while 
Promises still give clear, modern code, and allow for any such needs in future.

### Pinia

Pinia is an easy component to add, except for one severe problem, that the
apparent best persistence module doesn't get along with contemporary 
ES Modules, and I couldn't get a pull request honored to fix this.

Thus there's a fixup using a Vite pretense in the prepare support modules, 
which it seems could be quite useful to apply in other cases like this.

### Pug

Pug is very handy, especially in verbose CSS settings like Vuetify. It
can't be employed with Astro itself, but works fine as an add-on for 
Vue components, and potentially others.

Pug is the simmplest Vue extension here.

### Vuetify

Vuetify is a horse of a rather different color. Being actually composed of
quite ill-documented Vue coding, it needs careful handling so that Vite 
doesn't fail on, or lop off, its styoing information.

The needs are different between dev and build execcutions, and so dynamic
modifications of Astro's base Vite config are used to bring Vuetify to 
a reality, beyond simply `use()`ing it.

With @natemoo-re 's Virtual Module approach now in Astro, these methods should 
be readily ported out of the support routines in the Prepare and
`astro.config.mjs` scenery.

## The demo app

One may hope the demo can be appreciated as it is: a buildup over time as 
a breadboard, if that nomenclature for a developmental model hasen't departed
out of reach.

No effort beyond the minimum has been put into cosmetics, beyond a consistent
dark-mode type appearance, and a very little adjustment to keep it mostly on
central browser screen, or at least still useable on a narrow cellphone.

### Underlying intentions and futures hinted

This demo is fast, after first load of screens, which are already rapid enough.

The additonal speed, though, is for a purpose, and that is where a supported
(this time) Turbo comes in.

- we are using the [Hotwire](https:hotwire.dev) version of Turbo, which actually 
  works with no fuss, code to be found in the Prepare scripting.

- This Turbo is so fast that it attracts animation smoothing, to settle down
  browser visuals on some machines -- not yet in use.

- But our intention goes further, towards
  the sort of complex and actual SPAs that the website linked into the demo, 
  [Combat Covid](https://combatcoved.equipment) begins to suggest.

- Combat Covid was put together in a very short race of months, 
  through the framework of sadly now-abandoned Gridsome, and 
  all the work on this Prepare system and components has been 
  with the idea of being able to do the same as usefully with Astro.

- There's more though that would flesh out a fully capable SPA
  platform, with all the apparent advantages that has. Astro could
  evidently make very good use of a global Pinia-like state system. 
  And in a fully SPA-compposed app, eventing will be even more necessary.

- This Prepare project, then, leaves off with an angle towards the full
  publicized intention of the [Hotwire](https:hotwire.dev) project. 
  It's been delayed, but with Turbo working as well as it apparently does,
  perhaps we could find some useful attraction in the promise Hotwire's 
  'HTML-centric approach to state and wiring' intimates for their Stimulus.

- There are still months left in 2022, and so we might hope Stimulus 
  to appear on its revised schedule, which it seems could well bear 
  watching, not so?

## Conclusion

As a person in a quite experienced, also unusual position, I don't know if 
personally de-cloaking will be further appropriate for Astro, but I wish
the project very well, and have been quite entertained by the degrees
of individual enthusiam, the fresh natures of your workings together, 
and the evident abilities appreciaated for each of the persons visible 
in all you are doing. 

Best fortune, then, indeed.

Clive