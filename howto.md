---
title: How to create your own Vue3 + VitePress web-based game
author: Kevin Damm
next: { text: "Step 1: Setup", link: "howto.step1" }
---

# Creating your own game using Vue3

Occasionally people have asked me, "How do I get started with programming (or
web development)?"  or "How do I get started writing video games?"

My usual advice is to find a project
that you already really want to build, and then learn the elements and skills
to get you there.  But, sometimes that's difficult when you're not entirely
sure what is possible and what is not, what is easier and what is hard.

---

I made this to serve as a vehicle for showing how to add certain common
and useful features of a web application, how to host it for free on GitHub,
and attempt to explain some best practices that I've learned over the years.

I've chosen to use VitePress for
this because it strikes a nice balance between flexibility/capability and the
amount of setup required to get things going.  You can substitute it for
just about any other web framework, but I will be showing off some very useful
Vue3-specific features that will be a little more difficult to port directly
to most frameworks.  This decision is admittedly a little selfish because I
want the additional practice-hours in Vue3 because I have decided to use it in
a few larger projects.  If you're here to learn more about Vue3 or VitePress,
that will work out nicely!


---

The tutorial will be divided into the following steps:

<div v-for="obj in steps" key="obj.id" class="step">
  <input type="checkbox" id="obj.url" :checked="!!obj.done">
  <label for="obj.url">&nbsp;{{ obj.desc }}</label>
  <span v-if="obj.ready">&nbsp;(<a :href="obj.url">Step {{obj.id}}</a>)</span>
</div>


---

These steps will be detailed in a series of posts, addressing each one
incrementally, with visual/interactive feedback at each step and some suggested
exercises for additional practice.

I intentionally chose a simpler game, you might recognize it as being very
similar to a certain classic and well-known game, but it is not immediately
recognizable.  This makes for an interesting philosophical question about game
uniqueness.  More on that in the [Epilogue](howto.epilogue) of the tutorial.

Each step also has its own [branch in the repository](https://github.com/kevindamm/number-scrabble/branches).
These are useful if you want to check your progress against mine, or if my
explanation is not clear (I've tried to examine all of my assumptions but I'm
still learning how to write good tutorials, thanks for bearing with me).

## Your Background

I have tried to keep this accessible and useful regardless of whether you are new
to learning programming, while still trying to be direct and useful for those
who mostly want to learn the particulars of Vue3 and VitePress.
I will be assuming that:

 - You've had some introduction to HTML, CSS and JavaScript.

   This is not a full web development tutorial because there is a lot of
   material that I will not have room to cover.  I will, however, be going 
   through each step and explaining the purpose of every piece of code, so
   you should still be able to follow along as a beginner.

   For an excellent introduction to web development topics, see MDN's course
   modules for
   [HTML](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics), 
   [CSS](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics), and
   [JavaScript](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics).
   Even if you only read the overview pages, that should inform you enough to
   follow along with this tutorial.
   MDN's reference documents are also excellent for learning a specific element
   or function that you find referenced here, if it's core web technology.  Any
   Vue3-specific elements will be called out as such, so that you know which
   documentation to refer to for further details.

 - You have a GitHub account and can create a repository and save code to it.

   This is also a little outside the scope of this tutorial, but GitHub's own
   documentation is very useful to get you up to speed here.  I would suggest
   starting with their ["Get Started"](https://docs.github.com/en/get-started)
   material.

 - You understand a little bit about [how the web works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works).

   You don't need to be an expert on this topic, or even know much beyond the
   concept of a client and a server, because this tutorial will not be dealing
   with player-to-player interaction.  If you're interested in seeing me expand
   this tutorial to cover multiplayer contexts, let me know.  I will consider 
   it if there's enough interest, but it is a significant increase in scope.



<script setup lang="ts">
interface TutorialSteps {
  id: number;
  step: string;
  desc: string;
  ready: boolean;
}

const steps = [
  {
    id: 1,
    url: "howto.step1",
    desc: "Set up VitePress as a Static Site Generator (SSG) with automatic deployment",
    done: true,
    ready: true
  },
  {
    id: 2,
    url: "howto.step2",
    desc: "Author a Vue3 Component and embed it in the markdown of a page",
    done: true,
    ready: false
  },
  {
    id: 3,
    url: "howto.step3",
    desc: "Add some CSS styling to the component's template",
    ready: false
  },
  {
    id: 4,
    url: "howto.step4",
    desc: "Add interactivity for player's inputs",
    ready: false
  },
  {
    id: 5,
    url: "howto.step5",
    desc: "Add a decision-making process for the AI",
    ready: false
  },
  {
    id: 6,
    url: "howto.step6",
    desc: "Use LocalStorage to remember the player's preferences and current game state",
    ready: false
  },
  {
    id: 7,
    url: "howto.step7",
    desc: "Adding commenting/feedback to pages by integrating Gisqus and GitHub Discussions",
    ready: false
  }
]
</script>

<style>
.step {
  padding-bottom: 1em;
}
</style>
