<div style="text-align:center;">
  <img src="/assets/logo/angular.png" alt="angular" style="max-height:100px;">
  <img src="/assets/logo/github-pages.png" alt="githubpages" style="max-height:100px;">
</div>

### **TL;DR:** Step by step on how i made a dead simple blog in angular.[Code is here](https://github.com/pedroraft/pedroraft.com/)
## **# Intro**
- [Creating the post engine](#markdown)
- [Routing to the right post](#router)
- [Giving some style](#css)
- [Adding a comment section](#disqus)
- [Deploying to GitHub Pages](#githubpages)


[Angular](#teste)

[Angular](https://angular.io/) is really the coolest thing i learned in a while, naturally when i thought about making a blog i knew i would code it myself and it would be angular. I don't intent to make a full framework or product out of this, just a boilerplate for other people that want to use this.

<img src="/assets/logo/jekyll.png" alt="jekyll" style="float:right;max-height:100px;">

If you ain't familiar with [GitHub pages](https://pages.github.com/), [Jekyll](https://jekyllrb.com/) or [Octopress](http://octopress.org/) here is a quick explanation:  
- GitHub as a service called GitHub Pages that hosts only static files, no server code.
- Jekyll is a static blog generator written in ruby.
- Octopress is GitHub version of Jekyll.


This is like Jekyll, there is no back-end server or API, just static hosting of files, the difference is that instead of generating the html on the compilation process we generate it on the client dynamically.
Process to create a new post on both is the mostly same, create a markdown(.md ) file then commit and push to git, on a branch called gh-pages by default, GitHub will generate your website with your newly created post.

---
<div id="markdown"></div>

## I Will take you trough the creation process and some decisions.
## **# Markdown Parser**

<img src="/assets/logo/markdown.png" alt="markdown" style="float:right;max-height:150px;">

### facts has been slightly altered for story telling purposes, first version of this post was kinda lame.

The most important component in this application is the markdown parser, md to html. There is a library [angular2-markdown](https://github.com/dimpu/angular2-markdown), even comes with [PrismJs](http://prismjs.com/) with it.
Add import to app.module.ts, load prism css file for syntax highlighting.
And use it like this:

```html
<markdown path="/path/to/readme.md"></markdown>
```

Simple af, now markdown code renders to a nice html with syntax highlighting, let's move on!

edit: not so simple younger me, i later had to tamper with this library to get html anchors working and add some functionality.

---
<div id="router"></div>

## **# Router**

<img src="/posts/blog-series/img/treasure-map.png" alt="map" style="float:right;max-height:150px;">

Now the routing part, how do we navigate to this page now? 

We need to know how site.com/my-post correspond to file /path-to-file/my-post.md

And we need to make a post list page, like a home, maybe a search bar as 
well.

[Jekyll uses a short yaml description on top of the post file](https://jekyllrb.com/docs/posts/#a-typical-post), problem with that approach for us is that we would need to load all posts just to show a list with their titles.

I decided to go with a index file. Could be json but i went with typescript because reasons. For ease of finding your self when you already wrote many many posts you can create smaller index files and import them in the main index file, just include the name of the folder in the constant path.

```typescript
const path = 'blog-series';
export const blogSeries: Post[] = [
  {
    title: 'How to setup Travis CI with Angular and GitHub Pages',
    date: new Date('10/18/2017'),
    tags: ['angular', 'github', 'travis-ci'],
    slug: 'setup-travis-ci-angular-github-pages',
    path: path
  },
];
// later in post-index.ts file
export const postIndex: Post[] = [].concat(myPostSeries);
// we can search this index later like this
this.post = postIndex.find((p) => p.slug === window.location.pathname.substring(6));
// or
this.indexFiltered = postIndex.filter((p) => p.tags.includes(this.selectedTag));

```

edit: i changed the post model... many times... first because i decided date as a string was a bad idea (duh?) later because of meta cards
---
<div id="css"></div>

## **# CSS Time**

I'll be using [Milligram](http://milligram.io/) it's as simple as a css framework can get, im no designer so the code speaks more than me:
> Milligram provides a minimal setup of styles for a fast and clean starting point. Just it! Only 2kb gzipped! It's not about a UI framework. Specially designed for better performance and higher productivity with fewer properties to reset resulting in cleaner code. Hope you enjoy!

Didn't import all files from it, since i'll be making my own css for some stuff. Another thing you will see in the css is pages don't have absolute #000000 black text, it hurts your eyes, it's all about gray scale. I usually use this color pallet [open-color](https://yeun.github.io/open-color/) in my projects, it's easy to remember the names.

This code shows the basic idea here, but feel free to style as you please if you fork this.
```sass
@import '~prismjs/themes/prism-okaidia.css'
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400')
@import "~open-color/open-color.scss"
@import "~normalize.css/normalize.css"

@import "~milligram/src/Color"
$color-primary: $oc-orange-6

@import "~milligram/src/Blockquote"
@import "~milligram/src/Button"
@import "~milligram/src/Code"
@import "~milligram/src/Divider"
@import "~milligram/src/Form"
@import "~milligram/src/Grid"
@import "~milligram/src/List"
@import "~milligram/src/Table"
@import "~milligram/src/Image"
@import "~milligram/src/Utility"

html
  font-family: 'Source Sans Pro', sans-serif !important
  color: $oc-gray-7
  font-size: 14px

h1, h2, h3, h4, h5, h6, a
  color: $oc-gray-8
  font-weight: 300

.link:hover, a:hover
  color: $color-primary
  cursor: pointer
  text-decoration: underline
```

---

<div id="disqus"></div>

## **# Adding a comment section**

[Disqus](), do i need to say more?

Library called [ngx-disqus](https://github.com/murhafsousli/ngx-disqus), all you need is your disqus short name and the post id.

As we don't have a post id per say we will use the post slug, witch has to be unique anyways since is the url. Also the ngif to avoid problems.
```html
<disqus [identifier]="post?.slug" *ngIf="post?.slug"></disqus>
```
<div id="config"></div>

## **# Config File, Other people might want to use this**

Gather all configurations in one file, also i'll later add the fixed pages thing, like a about that goes to a about.md and is fixed at the sidebar.

````typescript
export const config = {
  blogName: 'Pedro Raft\'s Blog',
  sidebarLinks: [
    {link: 'https://github.com/pedroraft', description: 'GitHub'},
    {link: 'https://gitlab.com/pedroraft', description: 'GitLab'},
  ],
  sidebarFunnyStrings: [
    'Something funny',
    'Something funny 2',
  ],
  disqusName: 'pedroraft-com'
};
````

---

<div id="githubpages"></div>

## **# Deploying to GitHub Pages and associating custom domain**

Jekyll deploys automatically on GitHub, angular code.. not so much. But there is a library for that [angular-cli-ghpages](https://github.com/angular-buch/angular-cli-ghpages). Just:
```bash
ng build --prod
ngh
```
edit: just a while after deploying this i noticed pages give a 404 error if you it f5 out of the main page, that happens because github doesn't play nice with single page applications, luckily [Daniel Buchner created a hack for this](http://www.backalleycoder.com/2016/05/13/sghpa-the-single-page-app-hack-for-github-pages/). Basically you create a 404.html in your /src (remember to add to .angular-cli.json as assets) that saves your current url at the temporary session storage then redirects you to your sites root,
in your index, where angular router has power, then it redirects back to the page saved in the session storage. Dirty but smart. Not if this is a problem for seo or not.

**404.html**
```html
<!doctype html><html><head>
  <!-- This stores the URL the user was attempting to go to in sessionStorage,
  and then redirects all 404 responses to the app’s index.html page -->
  <!-- See http://www.backalleycoder.com/2016/05/13/sghpa-the-single-page-app-hack-for-github-pages/ -->
  <script>
    sessionStorage.redirect = location.href;
  </script>
  <meta http-equiv="refresh" content="0;URL='http://pedroraft.com'">
</head><body></body></html>

```

**index.html**
```html
<head>
  ...
  <script>
    // See http://www.backalleycoder.com/2016/05/13/sghpa-the-single-page-app-hack-for-github-pages/
    (function(){
      const redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      if (redirect && redirect !== location.href) {
        history.replaceState(null, '', redirect);
      }
    })();
  </script>
</head>
```

The cli will setup a branch called gh pages and deploy to it. Just make your dns configuration next, [Github has a guide for this](https://help.github.com/articles/using-a-custom-domain-with-github-pages/). Basically point the dns to GitHub server, go to the repository settings and set your domain name.

## In another post i'll talk about how to use this as a **boilerplate** for yourself.
## [This post goes trought integrating this with travis ci for automatic builds](/post/setup-travis-ci-angular-github-pages)

*ps. can someone tell me how to load prismjs plugins? Tried loading from angular-cli.json, also from prism.languages.ts*

*ps. 'oHbe' Qav post ghu'vam vItul*
