### TL;DR: Step by step on how to make a dead simple blog in angular.

Let's divide in chunks and add functionaty as we go:

- Read and render the markdown
- Route to the markdown
- Make a post list aka the main page
- Sprinkle some layout

## Rendering the markdown file

Well it's angular, there is a library/wrapper for just about anything: [angular2-markdown](https://github.com/dimpu/angular2-markdown)

```bash
npm install angular2-markdown --save
```

Add to app.module.ts:

```typescript
@NgModule({
  imports: [
    BrowserModule,
    MarkdownModule.forRoot(), // the forRoot its because we are importing at main module
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
```

Load primsjs in src/styles.sass file for syntax highlighting:

```sass
@import 'prismjs/themes/prism.sass'
```

And use it like this:

```html
<markdown path="/path/to/readme.md"></markdown>
```

Done, Let's move on!

## Routing to the right markdown file

I have decided to fake a database with a fixed json, a clear improvement would be reading this information from the markdown header like Jekyll, i'll add to the todo list.

```json
[
  {
    "title": "Lorem ipsum dolor sit amet",
    "subtitle": "Lorem ipsum dolor sit ameias nam necessitatibus quasi, quisquam, repudiandae unde ut voluptates?",
    "author": "me",
    "date": "11/11/1111",
    "slug": "This-is-the-file-name-and-url"
  }
]
```

Let's make a service for this, so we can leverage angular hierarchical dependency injection, this means we will be able to change the page, come back and the data will still be there since it will be in the service thats injected at layout level, though we can still subscribe to this service in page level components (or lower):

```typescript
@Injectable()
export class IndexService {
  public index: Post[];
  public indexSubscriber = new ReplaySubject<Post[]>();

  constructor (private http: Http) {
  }

  get (): void {
    this.http.get('/assets/markdown/index.json')
      .map((x) => x.json()).subscribe((x) => {
      this.index = <Post[]>x;
      // update the subscriber
      this.indexSubscriber.next(this.index);
    });
  }

  public search (fileName: string): Post {
    // if we just found our page in the index.json
    return this.index.find((x) => x.slug === fileName);
  }
}

// later in app component
export class AppComponent implements OnInit {

  constructor (private indexService: IndexService) {
  }

  ngOnInit () {
    this.indexService.get();
  }
}
```

All we need to do now it's iterate throught this json looking for the title in the url:

```typescript
@Component({
  selector: 'app-content',
  templateUrl: 'content.component.html'
})
export class ContentComponent implements OnInit {
  public post: Post;

  constructor (private indexService: IndexService,
               private title: Title) {
  }

  // TODO: include metadata and other seo optimizations
  ngOnInit () {
    this.indexService.indexSubscriber.subscribe((x) => {
      // take the url http://localhost:4200/post/file
      // the window.location.pathname = /post/file
      // after substring = file
      this.post = this.indexService.search(window.location.pathname.substring(6));
      this.setTitle();
    });
  }

  setTitle (): void {
    if (this.post) {
      this.title.setTitle(this.post.title);
    }
  }
}
```

And the html for the page:

````html
<h1>{{post?.title}}</h1>
<h3>{{post?.subtitle}}</h3>
<markdown path="assets/markdown/{{post?.slug}}.md" *ngIf="post?.slug"></markdown>
<span>{{post?.author}}, {{post?.date}}</span>
<div *ngIf="!post" style="text-align: center;">
  <h1>404</h1>
  <h2>Not found, <a href="/">Go back</a></h2>
</div>
````
## At this point should look like this (don't worry i will go through css later):
![MarkDown Post](/assets/markdown/img/markdownpost.png "MarkDown Post")

## Post list aka the main page

Get and display the posts:

```typescript
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {
  public index: Post[];
  public indexFiltered: Post[];
  public tag: string;
  private sub: any;

  constructor (private indexService: IndexService,
               private title: Title,
               private route: ActivatedRoute) {
  }

  ngOnInit () {
    // TODO: make a config file for this
    // Setting default title back
    this.title.setTitle('Pedro Raft\'s Blog');
    this.indexService.indexSubscriber.subscribe((x) => {
      this.index = <Post[]>x;
      // default value to indexFiltered
      this.indexFiltered = this.index;
      // this subscribes to the route and listen for changes
      this.sub = this.route.params.subscribe(params => {
        this.tag = params['tag'];
        this.filter();
      });
    });
  }

  ngOnDestroy () {
    this.sub.unsubscribe();
  }

  filter (): void {
    if (this.tag) {
      // maintain original index for further filter changes
      this.indexFiltered = this.index.filter((p) => p.tags.includes(this.tag));
    }
  }
}
```
Now the html, notice i iterate the var indexFiltered not index:
```html
<div>
  <div *ngFor="let item of indexFiltered">
    <h2 [routerLink]="['/post', item.slug]">{{item.title}}</h2>
    <span>{{item.author}}, {{item.date}}</span><br><br>
    <p *ngIf="item.subtitle">{{item.subtitle}}</p>
    <a *ngFor="let tag of item.tags" [routerLink]="['/list', tag]">{{tag}}</a>
    <hr>
  </div>
</div>
```

### Intermission, how do we navigate to this page now?

Enter angular router to the rescue (the reason 3 will never be):

```typescript
export const appRoutes: Routes = [
  {path: 'list', component: ListComponent},
  {path: selectedTag, component: ListComponent},
  {path: 'post/:name', component: ContentComponent},
  {path: '**', redirectTo: 'list'},
];
// in  app.module.ts:
@NgModule({
  declarations: [...],
  imports: [...
    RouterModule.forRoot(appRoutes)],
  ...}
```

Further improvements are coming, here its a list:
* make my own markdown wrapper so that i have more control over prism
* remove index.json, read information from markdown header as yaml
* implement prism plugins, more languages as well
* make a config json so i can setup yeoman, it will be easier to people adopt this code if they could setup without touching a code editor
* make fixed pages
* clicking a filtered tag should remove filter

## css sprinkling
[i'll write this at my next post.](/post/making-some-css-angular-blog)

## Final act, Gitlab automagic build and deploy
Soon
