---
title: Getting started with VitePress
author: Kevin Damm
prev: { text: "Introduction", link: "howto" }
next: { text: "Step 2: Game Logic", link: "howto.logic" }
---

# Getting started with VitePress

This post describes how to get up and running with VitePress, including
hosting it on GitHub Pages and deploying it automatically when the `main`
branch of the repository is updated.

This covers everything that is already in VitePress's [getting started guide](https://vitepress.dev/guide/getting-started)
as well as a few extra steps for adding Continuous Deployment (CD)
using GitHub Workflows (or, alternatively, using Cloudflare's integration with
GitHub Pages).

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

This will ask a few simple questions.  Don't worry too much about the exact wording
of the title or description, these can easily be changed later.

You can still customize the layout and theme if you selected "default theme" but
it is a little easier to start from one of the other two options because it
fills out some boilerplate for you (the .vitepress/theme folder contents).

For this tutorial we will use the default theme, but if you have custom
components that you want to reuse across pages,
  use "default with customization."
If you want to make significant changes to the site's layout and color palette,
and those changes are consistent across the site,
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
select "GitHub Actions" if you want to deploy automatically using GitHub. we'll set up the workflow next.

If you have Cloudflare and want to connect it directly to Pages, (along with
the bonus features they provide with it) select "Deploy from a branch" and
skip to the following subsection.  


### Using GitHub actions & action runners

If you want to automatically deploy your site when you push a new revision, use
GitHub Actions to define a workflow that triggers a build and deploy for you.

If you have Cloudflare and you plan on fronting the site using their services,
there is a much easier way (with bonus features) that is described in the next
section, and you should skip the steps here.

GitHub workflows are defined as YAML files in a special directory
(at `.github/workflows` within the repository's root directory).
It doesn't matter what you name the file (but you should use extension *.yml),
usually what you'll see in GitHub's UI is the workflow's name, so always start
with the name property, and give it something descriptive:

```yaml
name: Deploy site to GitHub Pages
```

We want this workflow to run whenever the `main` branch is committed, so define
that constraint next:

```yaml
on:
  push:
    branches: [main]
```

We need to give the action runner permission to read the source code and write
to Pages as well as have automatic token authentication (`id-token` permission).
It may seem counter-intuitive but id-token's permission needs to be 'write' for
the ability to request a JWT token from GitHub's servers.

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Because we might push a PR while a recent PR's automated workflow is still
running, we should specify what we expect to happen when two instances of this
workflow are triggered.  I've chosen to cancel the in-progress run but you could
allow it to complete (not be cancelled) by passing false there.  With a pages
upload it shouldn't really matter but it depends on if there are side effects
in latter steps of the job that expect to complete whenever earlier steps are
started (like shutting down an integration test environment or sending email,
or if you want to make sure all combinations of a matrix are always run).

You can set this on job properties to limit the isolation to only certain jobs
in the workflow instead of the whole workflow, but I'm keeping it simpler here.

The default is false, which keeps one 'running' and one 'pending' job in the
queue at any time.  By setting it to true, it will cancel the 'running' one and
'pending' jobs/workflows only exist while the running job is transitioning to
canceled.  You can also set it to the value of an expression, so for example

```yaml
concurrency:
  group: pages
  cancel-in-progress: true
```

For more details about this setting, see the [github docs on concurrency](https://docs.github.com/en/enterprise-cloud@latest/actions/using-jobs/using-concurrency).

Also, note that the group name is case-insensitive, so 'pages' and 'Pages' and
'PAGES' are considered the same group name.  The name doesn't have to match but
making it related to the workflow purpose is a good method to avoid accidentally
reusing a name from another job/workflow.  It only has to be unique within this
repository (not unique per-user or per-organization), so it is possible to reuse these workflow definitions across repositories even with explicit values like this.  If you want
even more flexibility you can specify the values as expressions instead of explicit values.
For example, the following would create a group that is related to the current
workflow name and only cancel running instances when we're in a branch other than 'main'.
This is even easier to use across projects but it is slightly less searchable and takes a bit longer to read & understand.

```yaml
concurrency:
  group: ${{ github.workflow }}
  cancel-in-progress: ${{ !contains(github.ref, 'main/')}}
```

Now, for the main reason we're defining this file &ndash; the job definition.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
```

There are a sequence of things (about 7 of them) we need the workflow to do:

 1. check out the code
```yaml
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
```
   (the fetch-depth is so that we can get the lastUpdated time from each file, but this isn't needed if you aren't using the file's timestamps to get the date/time of posts)

 2. set up Node.js
```yaml
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm  
```

 3. set up pages (a github-provided action)
```yaml
      - name: Setup Pages
        uses: actions/configure-pages@v4
```

 4. install application depedencies (as defined in package.json)
```yaml
      - name: Install dependencies
        run: npm ci
```

 5. build the pages (i.e., run the static site generation)
```yaml
      - name: Build with VitePress
        run: npm run docs:build
```
   If you've used a different script name in your package.json then make sure it's reflected here.

 6. upload the generated files to pages (this is limited to a 1GB tarball, which should be enough for most sites, and if not then some content needs to go into block storage or a database, somewhere that you can retrieve at runtime).
```yaml
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist
```
   This is also where you can specify the path that vitepress builds into (defined in config.mts) in case you're not using the default shown here.

I use a separate environment to do the actual deployment, this way I can put
protection rules on it and have those rules only affect the more sensitive jobs.
It's also a good practice to limit access to secrets between actions, using a minimal permissions model.

I've named this second job "deploy" (the first one was named "build").

```yaml
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

See the entire [workflow definition](https://github.com/symbolnotfound/number-scrabble/blob/step1/.github/workflows/deploy.yml)
for all the details.  Since I'm actually using the Cloudflare connection for the
site, that workflow is only defined within the `step1` branch, you won't find it
in the main branch or any of the other steps.  GitHub will run the workflow
if the file exists and I don't want it interfering with the Cloudflare process,
and I don't have to worry about it as long as it isn't on the `main` branch
(it's not triggered for other branches so it doesn't matter if it's in `step1`).


### Using CloudFlare + Pages

Cloudflare has an internal workflow that sets up GitHub Pages alongside their Pages product.
There are several benefits to
this, notably that it works nicely with Cloudflare's Workers product so that
you can combine github (stateless) with a stateful server backend to get both
sets of features.  It also makes it very easy to see a preview of your site
before it's deployed, and a convenient way to surface that within a PR, too.
You can always preview your changes locally, but making them visible to a code
reviewer is not usually as easy, but immensely useful.

Setting it up is as easy as connecting your GitHub repository to Clouldflare,
see [their instructions](https://developers.cloudflare.com/pages/get-started/git-integration/)
for how to do it.  It involves filling out an auth
form on Cloudflare's website to provide them with a token to authenticate from.  They don't get to act as you beyond the
permissions to the repository that you've granted them, and you can always
disconnect Cloudflare by revoking the auth token within GitHub's settings
(see [GitHub docs about reviewing OAuth apps](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/reviewing-your-authorized-oauth-apps) for further instructions).

![Cloudflare asks for which repositories to access, and requests (access to code & metadata) + (read and write for "checks, deployments and pull requests")](./img/AuthorizeCloudflarePages.png "example of auth questions and permissions granted")

Note that you will need to have pushed at least once to GitHub for it to have
a branch definition.  Cloudflare looks up the available branches for you to
select from, but it needs to find at least one branch (it won't create one for you).
However, if you created your repo through GitHub's web UI then they already
pushed a branch for you (usually also creating README.md and LICENSE files).


## Validate: submit, build & deploy

Now that you have your deployment automation set up (either through GitHub
Actions or using CloudFlare's connection via GitHub or GitLab), it's time to
test it.  Push a new change to github with these latest updates,
then track the progress of the workflow as it gets launched and runs.  Check that it succeeds and if it fails, check the logs to see where things went wrong.  If you followed the above steps, you shouldn't have any issues -- if you do, the common issues usually have good answers posted online.
