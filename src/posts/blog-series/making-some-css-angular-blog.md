im not a designer so i'll keep this as technical as possible.

* Content page
* Post list page
* Sidebar & general placing

## css sprinkling
[Milligram](http://milligram.io/) it's as simple as a css framework can get:
> Milligram provides a minimal setup of styles for a fast and clean starting point. Just it! Only 2kb gzipped! It's not about a UI framework. Specially designed for better performance and higher productivity with fewer properties to reset resulting in cleaner code. Hope you enjoy!

I'll use milligram to keep it simple, and won't import all files from it, since i'll be making my own css for some stuff.

Pages don't have absolut #000000 black text, it hurts your eyes, it's all about gray scale. I usually use this color pallet [open-color](https://yeun.github.io/open-color/) in my projects, it's easy to remember the names.

```sass
@import '~prismjs/themes/prism-okaidia.css'
@import url('https://fonts.googleapis.com/css?family=Montserrat')
@import "~open-color/open-color.scss"
@import "~normalize.css/normalize.css"

@import "~milligram/src/Color"
$color-primary: $oc-orange-6

@import "~milligram/src/Blockquote"
@import "~milligram/src/Button"
.button-sm
  text-transform: none
  font-size: 1rem
  height: 1.5rem
  line-height: 1.5rem
  background-color: $oc-gray-6
  border-color: $oc-gray-6
  color: $oc-gray-6 !important
  &:hover
    background-color: $oc-gray-9
    border-color: $oc-gray-9
    color: $oc-gray-9 !important
  &.active
    border-color: $color-primary
    color: $color-primary !important
    cursor: default
    &:hover, &:focus
      border-color: $color-primary

@import "~milligram/src/Code"
code
  padding: 0 !important

@import "~milligram/src/Divider"
hr
  margin: 1.5rem 0

@import "~milligram/src/Form"
@import "~milligram/src/Grid"
@import "~milligram/src/List"
@import "~milligram/src/Table"
@import "~milligram/src/Image"
@import "~milligram/src/Utility"

html
  font-family: 'Montserrat', sans-serif !important
  color: $oc-gray-7
  font-size: 14px

h1, h2, h3, h4, h5, h6, a
  color: $oc-gray-8

.link:hover
  color: $oc-gray-9
  cursor: pointer
  text-decoration: underline
```

Voila, content page is styled, the page that lists the posts have tag buttons, they should look different when activated, angular got your back with routerLinkActive it activates the class name when the route is active:
````html
<div>
  <div *ngFor="let item of indexFiltered">
    <h2 class="link" [routerLink]="['/post', item.slug]">{{item.title}}</h2>
    <span>{{item.author}}, {{item.date}}</span><br><br>

    <p *ngIf="item.subtitle">{{item.subtitle}}</p>
    <a *ngFor="let tag of item.tags" class="button button-outline button-sm"
       style="margin-left: 5px;" [routerLink]="['/list', tag]" routerLinkActive="active">{{tag}}</a>
    <hr>
  </div>
</div>
````

Now for the sidebar, you know navigation stuff (the controller is empty):
````html
<h3 class="blog-title">Pedro Raft's Blog</h3>
<!--<img src="https://avatars3.githubusercontent.com/u/14795934?v=4&s=460" alt="me" class="avatar">-->
<div class="sidebar-content">
  <h5 class="subtitle">Something funny</h5>
  <ul class="menu">
    <li><a [routerLink]="'/'">Posts</a></li>
    <li><a href="https://github.com/pedroraft" target="_blank">Github</a></li>
    <li><a href="https://gitlab.com/pedroraft" target="_blank">Gitlab</a></li>
  </ul>
</div>
````
I'll add a config for all of this later, this is just a bootstrap.
````sass
@import "~open-color/open-color.scss"

.sidebar-content
  text-align: left

.avatar
  border-radius: 50%
  max-width: 50%
  display: block

.blog-title
  font-weight: 300
  text-align: left

.subtitle
  font-weight: 200
  margin-top: 10px

.menu
  list-style: none
  padding-left: 0
  li
    margin-bottom: 10px
    a
      text-decoration: none
      &:hover
        color: $oc-gray-9
        cursor: pointer
        text-decoration: underline
````

Finally some wrapping and placing
````html
<div class="wrapper">
  <div class="sidebar">
    <app-sidebar></app-sidebar>
  </div>
  <div class="center content">
    <router-outlet></router-outlet>
  </div>
</div>
````

````sass
.wrapper
  text-align: center

.content
  margin-left: 15%
  width: 75%

.center
  display: inline-block
  text-align: left

.sidebar
  float: left
  position: absolute
  margin-left: 5%
  margin-right: 5%
  max-width: 15%
````

Done :)
