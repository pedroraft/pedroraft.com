<img src="/assets/logo/angular.png" alt="map" style="float:right;max-height:100px;margin-left:20px;">
<img src="/assets/logo/travis-ci.png" alt="map" style="float:right;max-height:100px;">

When using GitHub Pages with angular, builds don't happen like octopress on commit. [Travis CI](https://travis-ci.org/) comes to the rescue. Travis has a [doc for deploying to GitHub Pages](https://docs.travis-ci.com/user/deployment/pages/), but here is my guide to GitHub Pages with angular.

I made this setup for this blog. Remember to change urls and names.

## **# Preparing the application**

The angular cli commands are only avaliable when installed globally, this means that on the build server it won't be, we can setup to use the locally installed angular cli, just create a new script in the packages.json with the build parameters.

**packages.json**
````json
...
"scripts": {
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "test": "ng test",
  "lint": "ng lint",
  "e2e": "ng e2e",
  "build.prod": "ng build --aot --prod --progress false --base-href \"http://pedroraft.com/\""
}
...
````

## **# Travis CI**

Travis CI it's free for public projects at [travis-ci.org](travis-ci.org).

Private projects use [travis-ci.com](travis-ci.com) witch is paid, students have a free plan to work on.

Login with your GitHub account and your repos should all be listed under your account.

## **# Github auth token**

[Here is GitHub guide to create auth tokens](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/), once created goto settings in your repo build and add a enviroment variable with the name GITHUB_TOKEN.

![travis ci env](/posts/blog-series/img/travis-ci-token-setup.png "travis ci env")

## **# Build script**

Last step, insert the magic, this goes in the project root folder.

This is a very basic build script to run the command we created in the first step and publish to gh-pages branch.

**.travis.yml**
```yaml
language: node_js
node_js:
  - "6"

branches:
  only:
    - master

cache:
  directories:
    - node_modules

script:
  - npm run build.prod

deploy:
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN
  local_dir: dist
  fqdn: pedroraft.com // if you dont have a custom domain remove this
  on:
    branch: master
```

## Now just commit to the master branch and the build will start.

![travis ci log](/posts/blog-series/img/travis-ci-build-log.png "travis ci log")
