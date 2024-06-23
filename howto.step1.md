---
title: Getting started with VitePress
author: Kevin Damm
---

# Getting started with VitePress

In this post I will show how to get up and running with VitePress, including
hosting it on GitHub Pages and deploying it automatically when the `main`
branch of the repository is updated.

This covers everything that is already in VitePress's [getting started guide](https://vitepress.dev/guide/getting-started)
as well as a few extra steps for adding Continuous Deployment (CD)
using GitHub Workflows.

## Prerequisites

Before getting started, make sure you have the following installed on your system:

 - [Node.js](https://nodejs.org) (version 18 or higher) and NPM (included with Node)
 - Terminal for accessing VitePress via its command-line interface
 - Text Editor with Markdown syntax support (e.g., [VSCode](https://code.visualstudio.com/download))


## Installing and Setting Up VitePress

In the terminal, install vitepress:

```sh
npm add -D vitepress
```

Then begin the setup wizard:

```sh
npx vitepress init
```

This will ask a few simple questions.  Don't worry much about the exact wording
of the title or description, these can easily be changed later.

You can still customize the layout and theme if you selected "default theme" but
it is a little easier to customize from one of the other two options because
they fill out some boilerplate for you (the .vitepress/theme folder contents).

For this tutorial we can use the default theme, but if you have custom components
that you want to reuse across pages, "default with customization" or "custom theme"
are the better options.

## Deploying to GitHub Pages

If you haven't already created a repository for this project, do so now at [GitHub](https://github.com).

First enable the use of GitHub Pages.  If your repository is public you can do
this from a free personal account.  Go to the settings page for your repository
and on the left sidebar you'll see the Pages menu, where you can turn on the
feature.  See the [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)
for a more detailed walkthrough.

Within the "Build and deployment" section of the Pages settings, under "source"
select "GitHub Actions", we'll set up the workflow next.

### Defining the deployment workflow




## Validate: submit, build & deploy

...
