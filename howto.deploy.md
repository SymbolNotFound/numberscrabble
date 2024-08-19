---
title: Getting started with VitePress
author: Kevin Damm
prev: { text: "Introduction", link: "howto" }
---

# Getting started with VitePress

This post describes how to get up and running with VitePress, including
hosting it on GitHub Pages.  There are additional instructions depending on
how you want to automatically deploy updates -- you can choose whether
to have GitHub automatically deploy when you submit new changes, or have
Cloudflare detect pull requests and automatically update its Pages hosting.

Those two options are mutually exclusive, so this step forks after setting up
VitePress.  You can also set up a custom domain, which will depend on the
deployment method you choose.
If you are not interested in Continuous Deployment, you can still set up the
GitHub workflow and have it manually triggered instead of automatic.

The later steps are all independent of the choice for deployment. 


## Prerequisites

Before getting started, make sure you have the following installed on your system and you know where they are:

 - [Node.js](https://nodejs.org) (version 18 or higher) and NPM (included with Node)
 - a Terminal for accessing VitePress via its command-line interface
 - a Text Editor, preferably with Markdown syntax support \
   (e.g., [VSCode](https://code.visualstudio.com/download))


## Installing and Setting Up VitePress

In the terminal, install vitepress:

```sh
npm add -D vitepress
```

Then begin the setup wizard:

```sh
npx vitepress init
```

This will ask a few simple questions.  Don't worry too much about the exact
wording of the title or description, these can easily be changed later.

You can still customize the layout and theme if you selected "default theme" but
it is a little easier to start from one of the other two options because it
fills out some boilerplate for you (the .vitepress/theme folder contents).
This site is using the default theme, all style tweaks and additions are only
specific to the page they are on, each page is basically its own component.  You
can see that it comes bundled with a lot of useful functionality -- site-nav,
light/dark mode toggle, path-based routing, sidebar details, code highlighting,
and several other features.

However, if you have custom components that you want to reuse across pages,
  use "default with customization."
If you want to make significant changes to the site's layout and color palette,
and those changes are consistent across the site,
  "custom theme" is the better option.

You can always change your decision later, so I recommend starting with the
default theme, or default + customization, and worry about the style only after
you have added some content. 


## Deploying to GitHub Pages

If you haven't already created a repository for this project, do so now at [GitHub](https://github.com).  Make at least one commit to it, even if it's
just a barebones README.md (and LICENSE, presumably).

How you choose to deploy the site depends on whether you want to host it on
GitHub Pages or via Cloudflare.  This also affects an important setting in the
`.vitepress/config.mts` file

### GitHub Workflow

TODO advantages/disadvantages of this approach, restrictions (public repo or enterprise account), limitations (1GB content size)

TODO base: "/.../" where ... is your repository name

[Next: How To Deploy Using Github](howto.deploy.actions)


### Cloudflare Pages


[Next: How to Deploy Using Cloudflare](howto.deploy.cloudflare)

