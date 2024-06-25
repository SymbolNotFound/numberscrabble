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

This will ask a few simple questions.  Don't worry too much about the exact wording
of the title or description, these can easily be changed later.

You can still customize the layout and theme if you selected "default theme" but
it is a little easier to customize from one of the other two options because
they fill out some boilerplate for you (the .vitepress/theme folder contents).

For this tutorial we can use the default theme, but if you have custom components
that you want to reuse across pages, use "default with customization."
If you want to make large changes to the site's layout and color palette,
"custom theme" is the better option.

## Deploying to GitHub Pages

If you haven't already created a repository for this project, do so now at [GitHub](https://github.com).

First enable the use of GitHub Pages.  If your repository is public you can do
this from a free personal account.  (If you want the repository to be private it
can still be done but you need an Enterprise account).

Go to the settings page for your repository
and on the left sidebar you'll see the Pages menu, where you can turn on the
feature.  See the [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart)
for a more detailed walkthrough.

Within the "Build and deployment" section of the Pages settings, under "source"
select "GitHub Actions", we'll set up the workflow next.

### Using GitHub actions & action runners

If you want to automatically deploy your site when you push a new revision, use
GitHub Actions to define a workflow that triggers a build and deploy for you.

If you have Cloudflare and you plan on fronting the site using their services,
there is a much easier way (with bonus features) that is described in the next
section, and you should skip the steps here.

:::
...TODO describe the workflow file in small bites
:::

See the entire [workflow definition](https://github.com/symbolnotfound/number-scrabble/blob/step1/.github/workflows/deploy.yml)
for full details.  Since I'm actually using the Cloudflare connection for this
site, that workflow is only defined within the step1 branch, you won't find it
in the main branch or any of the other steps.  GitHub will run the workflow
if the file exists and I don't want it interfering with the Cloudflare process,
and I don't have to worry about it as long as the file isn't on the main branch
(and it's no triggered for other branches so it doesn't matter if it's in `step1`).


### Using CloudFlare + Pages

Alternatively, if you have a CloudFlare account, they have a workflow that sets
up GitHub Pages alongside their Pages product.  There are several benefits to
this, notably that it works nicely with CloudFlare's Workers product so that
you can combine github (stateless) with a stateful server backend to get both
sets of features.  It also makes it very easy to see a preview of your site
before it's deployed, and a convenient way to surface that within a PR review.
You can always preview your changes locally, but making them visible to a code
reviewer is not as easy, but immensely useful.

Setting it up is as easy as connecting your GitHub repository to Clouldflare,
see [their instructions](https://developers.cloudflare.com/pages/get-started/git-integration/)
 for how to do it.  It only involves filling out a
form on Cloudflare's website to provide them with a token to authenticate from.

Note that you will need to have pushed at least once to GitHub for it to have
a branch definition.  Cloudflare looks up the available branches for you to
select from, but it needs to find at least one branch (it won't create one for you).
However, if you created your repo through GitHub's web UI then they already
pushed a branch for you (usually also creating README.md and LICENSE files).


## Validate: submit, build & deploy

Now that you have your deployment automation set up (either through GitHub
Actions or using CloudFlare's connection via GitHub or GitLab), it's time to
test it.  Push a new change to github with your 
