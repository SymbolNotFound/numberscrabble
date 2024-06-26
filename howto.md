---
title: How to create your own Vue3 + VitePress web-based game
author: Kevin Damm
next: { text: "Step 1: Deploy", link: "howto.deploy" }
---

# Creating your own game using Vue3

People have occasionally asked me, "How do I get started with programming (or
web development)?"  or "How do I get started with game devlopment?"

My usual advice is to find a project that you already really want to build, and
then learn the elements and skills to get you there.  But, sometimes that's
difficult when you're not entirely sure what is possible and what is not,
what is easier and what is hard.

---

I made this to serve as a vehicle for showing how to add certain common
and useful features of a web application, how to host it for free on GitHub,
and using many of the best practices that I've learned over the years.
The intent is that you get a decent starting point, which you've assembled step
by step, ready to add new functionality but without the tutorial being about a
particular web application.

I've chosen some specific dependencies

 - GitHub for source control and hosting and code review
   - (optional) using Cloudflare as load balancer & caching & preview server
 - VitePress as SSG (Static Site Generator) for the documentation
 - Vue (vue3) as web application framework
   - (also a consequence of using VitePress)
 - VueUse for reactive localStorage, chroma.js for color manipulation
 - Gisqus for embedding comments into pages


This is not to imply that these are the best or only solution for a lot of
applications.  I chose VitePress because it needs minimal setup and allows for
writing the majority of content in [Markdown](https://www.markdownguide.org/).
I chose Vue3 because I appreciate its approach to reactive programming and the
ease of creating single-file components (SFCs).  VitePress also makes it easy
to blend Markdown and Vue components together seamlessly, which I do throughout
this site.  GitHub and Cloudflare are rather standard options for the features
they support but they are hardly the only choices.  The javascript libraries
were only chosen because they provide specific functionality that would not be
trivial to write ourselves, and because I wanted to demonstrate the importing of
third-party utilities as part of the tutorial.  Otherwise, I preferred to keep
the site's functionality within what (Vue + vanilla.js) can support, with
explanations for each part of the HTML, CSS and JavaScript implementation.

My motivations were largely for keeping the tutorial content as uncluttered as
possible, and personal opinions for what I think provide the better developer
experience.  You are free to substitute other frameworks or libraries that you
prefer, and if you have a strong reasoning for your preferences please share it 
in the comments. :call_me_hand:

---

The tutorial will be divided into the following steps:
<a id="todos" @click="clear" href="#todos" style="text-decoration: none; float: right;">
(clear :heavy_check_mark:s)
</a>

<div v-for="(obj, i) in steps" :key="obj.id" class="step">
  <input type="checkbox" :id="obj.id" :checked="!!obj.done">
  <label :for="obj.id">&nbsp;{{ obj.desc }}</label>
  <span v-if="obj.ready">&nbsp;(<a :href="`howto${obj.id}`">Step {{i+1}}</a>)</span>
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
who mostly want to learn the particulars of the chosen dependencies.
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
    id: "deploy",
    desc: "Set up VitePress as a Static Site Generator (SSG) with automatic deployment",
    done: true,
    ready: true
  },
  {
    id: "logic",
    desc: "Author a Vue3 Component and embed it in the markdown of a page",
    done: true,
  },
  {
    id: "style",
    desc: "Add some CSS styling to the component's template",
  },
  {
    id: "interact",
    desc: "Add interactivity and animations",
  },
  {
    id: "think",
    desc: "Add a decision-making process for the AI",
  },
  {
    id: "persist",
    desc: "Use LocalStorage to remember the player's preferences and current game state",
  },
  {
    id: "discuss",
    desc: "Use Gisqus to allow visitor comments (hosted by GitHub Discussions)"
  },
  {
    id: "epilogue",
    desc: "Some final thoughts, analysis of the game and the technologies being used",
  }
]

function clear() {
  for (const obj of steps) {
    const el = document.getElementById(obj.id)
    if (el) {
      el.checked = false
    }
  }
}

</script>

<style scoped>
.step {
  margin-bottom: 1em;
}
</style>
