### TL;DR: Step by step on how i made a dead simple blog in angular. And how you can use it.

Angular is really the coolest thing i learned in a while, naturaly when i tought about making a blog i knew i would code it myself and it would be angular. I don't intent to make a full framework or product out of this, just a boilerplate for other people that want to use this.

If you aint familiar with github pages, jekyll or octopress here is a quick explanation:  
- GitHub as a service called GitHub Pages that hosts only static files, no server code.
- Jekyll is a static blog generator written in ruby.
- Octopress is GitHub version of Jekyll.

This is like Jekyll, there is no back-end server or API, just static hosting of files, the difference is that instead of generating the html on the compilation process we generate it on the client dynamically.
Process to create a new post on both is the mostly same, create a markdown(.md ) file then commit and push to git, on a branch called gh-pages by default, github will generate your website with your newly created post.

# I Will take you trough the creation process and some decisions.

### facts has been slightly altered for story telling purposes, first version of this post was kinda lame.

The most important component in this application is the markdown parser, md to html. There is a library angular2-markdown, even comes with prismjs with it.
Add import to app.module.ts, load prism css file for syntax highlighting.
And use it like this:

```html
<markdown path="/path/to/readme.md"></markdown>
```

Simple af, now markdown code renders to a nice html with sintax highlighting, let's move on!

---

Now the routing part, how do we navigate to this page now? 

We need to know site.com/my-post correspond to file /path-to-file/my-post.md

And we need to make a post list page, like a home, maybe a search bar as 
well.

Jekyll uses a short yaml description on top of the post file, problem with that approach for us is that we would need to load all posts just to show a list with their titles.

I decided to go with a index file. Could be json but i went with ts because reasons. For ease of finding your self when you already wrote many many posts you can create smaller index files and import them in the main index file, just include the name of the folder in the constant path.

```typescript
const path = 'my-post-series-path';
export const myPostSeries: Post[] = [
  {
    title: 'My Post Title',
    date: '2017',
    tags: ['tag0', 'tag1', 'tag2'],
    slug: 'my-post-title',
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

## Next post i will talk about styling this blog, since this is completely a personal choice and don't fit here.

## also talk about how to use this as a boilerplate for yourself.

ps. can someone tell me how to load prismjs plugins? Tried loading from angular-cli.json, also from prism.languages.ts
